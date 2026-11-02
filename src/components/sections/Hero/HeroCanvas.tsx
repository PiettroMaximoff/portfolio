"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./HeroCanvas.module.css";

function circleTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const radius = size / 2;
  const gradient = ctx.createRadialGradient(radius, radius, 0, radius, radius, radius);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.62, "rgba(255,255,255,1)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.NoColorSpace;
  texture.needsUpdate = true;
  return texture;
}

type KnotDetail = {
  tubular: number;
  radial: number;
};

function knotDetail(width: number): KnotDetail {
  if (width < 720) return { tubular: 100, radial: 16 };
  if (width < 1100) return { tubular: 150, radial: 22 };
  return { tubular: 220, radial: 32 };
}

const KNOT_RADIUS = 1.18;
const KNOT_TUBE = 0.35;
// Centerline of a (2,3) torus knot peaks at 1.5× radius; the tube sticks out past that.
const KNOT_EXTENT = KNOT_RADIUS * 1.5 + KNOT_TUBE;

function fillKnot(target: Float32Array, tubular: number, radial: number) {
  const knot = new THREE.TorusKnotGeometry(KNOT_RADIUS, KNOT_TUBE, tubular, radial, 2, 3);
  const source = knot.attributes.position.array as Float32Array;
  target.set(source);
  const count = knot.attributes.position.count;
  knot.dispose();
  return count;
}

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement?.parentElement;
    if (!canvas || !parent) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;

    // Без WebGL (отключён, GPU в чёрном списке, старая машина) конструктор бросает
    // исключение. Фон декоративный: просто не рисуем его, а не роняем страницу.
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 50);
    camera.position.z = 6.4;

    const pointer = { x: 0, y: 0, active: false };
    let frame = 0;
    let visible = true;
    let width = 0;

    const map = circleTexture();
    const material = new THREE.PointsMaterial({
      size: 0.026,
      color: "#6e6e6e",
      alphaMap: map ?? undefined,
      alphaTest: 0.45,
      transparent: true,
      depthWrite: false,
      opacity: 0.7,
      sizeAttenuation: true,
    });

    let positions = new Float32Array(0);
    let origin = new Float32Array(0);
    let velocity = new Float32Array(0);
    let particleCount = 0;
    let figureScale = 1;

    const geometry = new THREE.BufferGeometry();
    const points = new THREE.Points(geometry, material);
    points.frustumCulled = false;
    points.rotation.x = 0.35;
    points.rotation.y = 0;
    scene.add(points);

    const build = (nextWidth: number) => {
      const detail = knotDetail(nextWidth);
      particleCount = (detail.tubular + 1) * (detail.radial + 1);
      positions = new Float32Array(particleCount * 3);
      origin = new Float32Array(particleCount * 3);
      velocity = new Float32Array(particleCount * 3);

      fillKnot(positions, detail.tubular, detail.radial);
      origin.set(positions);

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.deleteAttribute("color");
    };

    const halfHeight = () => Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return;
      const detail = knotDetail(rect.width);
      const nextCount = (detail.tubular + 1) * (detail.radial + 1);
      width = rect.width;
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
      renderer.setSize(rect.width, rect.height, false);

      const halfH = halfHeight();
      const halfW = halfH * camera.aspect;
      const fit = Math.min(halfW, halfH) * 0.86;
      figureScale = Math.min(1, fit / KNOT_EXTENT);
      points.scale.setScalar(figureScale);
      const baseSize = rect.width < 720 ? 0.034 : 0.03;
      material.size = baseSize * (0.7 + 0.3 * figureScale);

      if (nextCount !== particleCount) build(rect.width);
      if (reduce && particleCount > 0) renderer.render(scene, camera);
    };

    const onMove = (event: PointerEvent) => {
      if (!fine) return;
      const rect = parent.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
      pointer.active = inside;
      if (!inside || rect.width === 0 || rect.height === 0) return;
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const step = (spin: number) => {
      const reach = 0.42;
      const halfH = halfHeight();
      const halfW = halfH * camera.aspect;
      const tilt = points.rotation.x;
      const cosY = Math.cos(spin);
      const sinY = Math.sin(spin);
      const cosX = Math.cos(tilt);
      const sinX = Math.sin(tilt);
      const screenX = pointer.x * halfW;
      const screenY = pointer.y * halfH;
      const y1 = screenY * cosX;
      const z1 = -screenY * sinX;
      const local = pointer.active ? 1 / figureScale : 0;
      const mx = pointer.active ? (screenX * cosY - z1 * sinY) * local : 0;
      const my = pointer.active ? y1 * local : 0;
      const mz = pointer.active ? (screenX * sinY + z1 * cosY) * local : 0;

      for (let i = 0; i < particleCount; i += 1) {
        const ix = i * 3;
        const iy = ix + 1;
        const iz = ix + 2;
        const x = positions[ix];
        const y = positions[iy];
        const z = positions[iz];
        let vx = velocity[ix];
        let vy = velocity[iy];
        let vz = velocity[iz];

        if (pointer.active) {
          const dx = x - mx;
          const dy = y - my;
          const dz = z - mz;
          const dist = Math.hypot(dx, dy, dz);
          if (dist < reach && dist > 0.0001) {
            const force = (1 - dist / reach) * 0.015;
            vx += (dx / dist) * force;
            vy += (dy / dist) * force;
            vz += (dz / dist) * force;
          }
        }

        vx += (origin[ix] - x) * 0.0015;
        vy += (origin[iy] - y) * 0.0015;
        vz += (origin[iz] - z) * 0.0015;
        vx *= 0.94;
        vy *= 0.94;
        vz *= 0.94;

        positions[ix] = x + vx;
        positions[iy] = y + vy;
        positions[iz] = z + vz;
        velocity[ix] = vx;
        velocity[iy] = vy;
        velocity[iz] = vz;
      }

      const positionAttr = geometry.getAttribute("position");
      positionAttr.needsUpdate = true;
    };

    const render = () => {
      if (!reduce) {
        const t = performance.now() * 0.001;
        points.rotation.y = t * 0.05;
        points.rotation.x = 0.35;
        step(points.rotation.y);
      }
      renderer.render(scene, camera);
    };

    const loop = () => {
      frame = requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      render();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(parent);
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    visibility.observe(parent);

    resize();
    if (particleCount === 0) build(width || 1200);
    render();

    // Канвас смонтирован прозрачным: читаем стиль, чтобы браузер зафиксировал начальное
    // состояние, и только потом включаем проявление, иначе переход не сработает.
    void getComputedStyle(canvas).opacity;
    canvas.dataset.ready = "true";

    if (!reduce) {
      window.addEventListener("pointermove", onMove);
      frame = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
      window.removeEventListener("pointermove", onMove);
      geometry.dispose();
      material.dispose();
      map?.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
