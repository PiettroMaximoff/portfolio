import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectPlaceholder } from "./ProjectPlaceholder";

const markup = (slug: string) => render(<ProjectPlaceholder slug={slug} />).container.innerHTML;

describe("ProjectPlaceholder", () => {
  it("для одного слага всегда рисует один и тот же макет", () => {
    expect(markup("clinic-sites")).toBe(markup("clinic-sites"));
  });

  it("у проектов без скриншотов макеты различаются", () => {
    const layouts = ["clinic-sites", "agalarov", "zdeslegko", "torgberu"].map(markup);
    expect(new Set(layouts).size).toBeGreaterThan(1);
  });

  it("без подписи картинка декоративная", () => {
    const { container } = render(<ProjectPlaceholder slug="torgberu" />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("с подписью доступна как изображение", () => {
    const { getByRole } = render(<ProjectPlaceholder slug="torgberu" label="Торгберу: скриншотов нет" />);
    expect(getByRole("img", { name: "Торгберу: скриншотов нет" })).toBeInTheDocument();
  });
});
