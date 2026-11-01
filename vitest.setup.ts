import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { createElement } from "react";
import { afterEach, vi } from "vitest";

afterEach(cleanup);

// next/image без сервера оптимизации: достаточно обычного <img> с теми же атрибутами.
// Служебные пропсы next/image в DOM попадать не должны.
const NEXT_IMAGE_ONLY_PROPS = ["fill", "preload", "priority", "quality", "sizes"];

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) =>
    createElement(
      "img",
      Object.fromEntries(Object.entries(props).filter(([key]) => !NEXT_IMAGE_ONLY_PROPS.includes(key))),
    ),
}));

// jsdom не реализует часть браузерных API, на которые опирается галерея.
if (!HTMLDialogElement.prototype.showModal) {
  HTMLDialogElement.prototype.showModal = function showModal(this: HTMLDialogElement) {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement) {
    if (!this.hasAttribute("open")) return;
    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
  };
}

Element.prototype.scrollTo = vi.fn() as unknown as typeof Element.prototype.scrollTo;
Element.prototype.scrollIntoView = vi.fn();
