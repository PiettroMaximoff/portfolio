import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Icon, iconNames } from "./Icon";

describe("Icon", () => {
  it("каждая иконка рисует хотя бы один контур и берёт цвет из текста", () => {
    expect(iconNames.length).toBeGreaterThan(0);
    for (const name of iconNames) {
      const { container, unmount } = render(<Icon name={name} />);
      const svg = container.querySelector("svg");
      expect(svg, name).not.toBeNull();
      expect(svg!.querySelector("path, circle, rect"), name).not.toBeNull();
      expect(svg).toHaveAttribute("stroke", "currentColor");
      expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
      unmount();
    }
  });

  it("без подписи иконка декоративная и скрыта от скринридера", () => {
    const { container } = render(<Icon name="mail" />);
    const svg = container.querySelector("svg")!;
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).not.toHaveAttribute("role");
  });

  it("с подписью иконка доступна как изображение", () => {
    const { getByRole } = render(<Icon name="mail" label="Почта" />);
    const svg = getByRole("img", { name: "Почта" });
    expect(svg).not.toHaveAttribute("aria-hidden");
  });

  it("передаёт толщину линии и класс", () => {
    const { container } = render(<Icon name="close" strokeWidth={2} className="mark" />);
    const svg = container.querySelector("svg")!;
    expect(svg).toHaveAttribute("stroke-width", "2");
    expect(svg).toHaveClass("mark");
  });
});
