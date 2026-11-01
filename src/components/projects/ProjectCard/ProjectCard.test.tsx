import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getProject } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

function renderCard(slug: string) {
  const project = getProject(slug);
  if (!project) throw new Error(`Нет проекта ${slug}`);
  return { project, ...render(<ProjectCard project={project} />) };
}

describe("ProjectCard", () => {
  it("ведёт на страницу проекта и показывает название, описание и компанию", () => {
    const { project } = renderCard("bizan-atlas");
    expect(screen.getByRole("link")).toHaveAttribute("href", "/projects/bizan-atlas");
    expect(screen.getByText(project.title)).toBeInTheDocument();
    expect(screen.getByText(project.summary)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(project.company))).toBeInTheDocument();
  });

  it("показывает не больше четырёх тегов", () => {
    const { project, container } = renderCard("bizan-atlas");
    expect(project.tags.length).toBeGreaterThan(4);
    const shown = project.tags.filter((tag) => container.textContent?.includes(tag));
    expect(shown).toEqual(project.tags.slice(0, 4));
  });

  it("со скриншотами показывает обложку и число скриншотов в правильном склонении", () => {
    const { container } = renderCard("agalarov");
    expect(container.querySelector("img")).toHaveAttribute("src", expect.stringContaining("/projects/agalarov/"));
    expect(screen.getByText("2 скриншота")).toBeInTheDocument();
  });

  it("с одним скриншотом счётчик не показывается", () => {
    renderCard("clinic-sites");
    expect(screen.queryByText(/скриншот/)).toBeNull();
  });

  it("без скриншотов вместо обложки рисуется заглушка", () => {
    const { container } = renderCard("torgberu");
    expect(container.querySelector("img")).toBeNull();
    expect(container.querySelector("svg[aria-hidden='true']")).not.toBeNull();
  });
});
