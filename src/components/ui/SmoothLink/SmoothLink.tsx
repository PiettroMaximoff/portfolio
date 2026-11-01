"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

type SmoothLinkProps = ComponentProps<typeof Link>;

export function SmoothLink({ href, onClick, ...props }: SmoothLinkProps) {
  return (
    <Link
      href={href}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || typeof href !== "string" || !href.startsWith("/#")) return;
        const target = document.getElementById(href.slice(2));
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.pushState(null, "", href);
      }}
    />
  );
}
