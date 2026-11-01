import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import type { ProjectImage } from "@/types/project";
import { ProjectGallery } from "./ProjectGallery";

const images: ProjectImage[] = [
  { src: "/a.webp", alt: "Главная", width: 1920, height: 980 },
  { src: "/b.webp", alt: "Каталог", width: 1920, height: 1100 },
  { src: "/c.webp", alt: "Корзина", width: 1920, height: 960 },
];

/** Подпись под слайдером: единственный элемент с aria-live. */
const caption = () => document.querySelector("p[aria-live='polite']")!;

describe("ProjectGallery", () => {
  it("ничего не рисует без скриншотов", () => {
    const { container } = render(<ProjectGallery images={[]} title="Проект" />);
    expect(container).toBeEmptyDOMElement();
  });

  it("рисует слайд на каждый скриншот с понятными подписями", () => {
    render(<ProjectGallery images={images} title="Проект" />);
    expect(screen.getByRole("group", { name: "1 из 3: Главная" })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "2 из 3: Каталог" })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "3 из 3: Корзина" })).toBeInTheDocument();
    expect(caption()).toHaveTextContent("01 / 03");
    expect(caption()).toHaveTextContent("Главная");
  });

  it("кнопки «вперёд» и «назад» меняют подпись, а с последнего слайда идут по кругу", async () => {
    const user = userEvent.setup();
    render(<ProjectGallery images={images} title="Проект" />);

    await user.click(screen.getByRole("button", { name: "Следующий скриншот" }));
    expect(caption()).toHaveTextContent("02 / 03");
    expect(caption()).toHaveTextContent("Каталог");

    await user.click(screen.getByRole("button", { name: "Предыдущий скриншот" }));
    await user.click(screen.getByRole("button", { name: "Предыдущий скриншот" }));
    expect(caption()).toHaveTextContent("03 / 03");
    expect(caption()).toHaveTextContent("Корзина");

    await user.click(screen.getByRole("button", { name: "Следующий скриншот" }));
    expect(caption()).toHaveTextContent("01 / 03");
  });

  it("клик по миниатюре переходит к нужному слайду", async () => {
    const user = userEvent.setup();
    render(<ProjectGallery images={images} title="Проект" />);
    await user.click(screen.getByRole("button", { name: "Скриншот 3: Корзина" }));
    expect(caption()).toHaveTextContent("03 / 03");
    expect(screen.getByRole("button", { name: "Скриншот 3: Корзина" })).toHaveAttribute("aria-current", "true");
  });

  it("стрелки клавиатуры листают слайдер", async () => {
    const user = userEvent.setup();
    render(<ProjectGallery images={images} title="Проект" />);
    screen.getByLabelText("Скриншоты, листаются стрелками").focus();
    await user.keyboard("{ArrowRight}");
    expect(caption()).toHaveTextContent("02 / 03");
    await user.keyboard("{ArrowLeft}{ArrowLeft}");
    expect(caption()).toHaveTextContent("03 / 03");
  });

  it("с одним скриншотом нет стрелок и миниатюр", () => {
    render(<ProjectGallery images={[images[0]]} title="Проект" />);
    expect(screen.queryByRole("button", { name: "Следующий скриншот" })).toBeNull();
    expect(screen.queryByRole("button", { name: /^Скриншот 1/ })).toBeNull();
  });

  describe("полноэкранный просмотр", () => {
    const openLightbox = async (user: ReturnType<typeof userEvent.setup>, name: string) => {
      await user.click(screen.getByRole("button", { name: `Открыть на весь экран: ${name}` }));
      // Закрытый <dialog> не входит в дерево доступности, поэтому ищем его напрямую.
      return document.querySelector("dialog")!;
    };

    it("открывается по клику на слайд и показывает выбранный скриншот", async () => {
      const user = userEvent.setup();
      render(<ProjectGallery images={images} title="Проект" />);
      const dialog = await openLightbox(user, "Каталог");

      expect(dialog).toHaveAttribute("open");
      expect(within(dialog).getByText("2 / 3")).toBeInTheDocument();
      expect(within(dialog).getByRole("img", { name: "Каталог" })).toHaveAttribute("src", "/b.webp");
    });

    it("листается стрелками клавиатуры и кнопками, закрывается крестиком", async () => {
      const user = userEvent.setup();
      render(<ProjectGallery images={images} title="Проект" />);
      const dialog = await openLightbox(user, "Главная");

      fireEvent.keyDown(dialog, { key: "ArrowRight" });
      expect(within(dialog).getByText("2 / 3")).toBeInTheDocument();

      await user.click(within(dialog).getByRole("button", { name: "Предыдущий скриншот" }));
      await user.click(within(dialog).getByRole("button", { name: "Предыдущий скриншот" }));
      expect(within(dialog).getByText("3 / 3")).toBeInTheDocument();

      await user.click(within(dialog).getByRole("button", { name: "Закрыть" }));
      expect(dialog).not.toHaveAttribute("open");
    });

    it("после закрытия блокировка прокрутки страницы снимается", async () => {
      const user = userEvent.setup();
      render(<ProjectGallery images={images} title="Проект" />);
      const dialog = await openLightbox(user, "Главная");
      expect(document.documentElement.style.overflow).toBe("hidden");

      await user.click(within(dialog).getByRole("button", { name: "Закрыть" }));
      expect(document.documentElement.style.overflow).toBe("");
    });
  });

  describe("типы скриншотов", () => {
    const slide = (name: string) => screen.getByRole("button", { name: `Открыть на весь экран: ${name}` });

    it("мобильный кадр (в том числе @2x) получает рамку по собственной пропорции", () => {
      render(
        <ProjectGallery
          title="Проект"
          images={[
            { src: "/m1.webp", alt: "Телефон 1×", width: 423, height: 878 },
            { src: "/m2.webp", alt: "Телефон 2×", width: 864, height: 1645 },
          ]}
        />,
      );
      expect(slide("Телефон 1×")).toHaveStyle({ aspectRatio: "423 / 878" });
      expect(slide("Телефон 2×")).toHaveStyle({ aspectRatio: "864 / 1645" });
    });

    it("сверхдлинный мобильный кадр не превращается в узкую полоску", () => {
      render(
        <ProjectGallery
          title="Проект"
          images={[
            { src: "/long.webp", alt: "Лендинг на телефоне", width: 375, height: 8668 },
            { src: "/short.webp", alt: "Экран", width: 1920, height: 980 },
          ]}
        />,
      );
      // Пропорция 375 / 8668 дала бы рамку шириной в пару десятков пикселей: берём обычную рамку из стилей.
      expect(slide("Лендинг на телефоне").style.aspectRatio).toBe("");
      expect(screen.getByText("Длинный экран — откройте целиком")).toBeInTheDocument();
    });

    it("подсказка про длинный экран показывается только для длинных кадров", async () => {
      const user = userEvent.setup();
      render(
        <ProjectGallery
          title="Проект"
          images={[
            { src: "/short.webp", alt: "Экран", width: 1920, height: 980 },
            { src: "/long.webp", alt: "Длинная страница", width: 1440, height: 6756 },
          ]}
        />,
      );
      expect(screen.queryByText("Длинный экран — откройте целиком")).toBeNull();
      await user.click(screen.getByRole("button", { name: "Следующий скриншот" }));
      expect(screen.getByText("Длинный экран — откройте целиком")).toBeInTheDocument();
    });

    it("десктопный экран и длинная страница не получают пропорцию телефона", () => {
      render(
        <ProjectGallery
          title="Проект"
          images={[
            { src: "/d.webp", alt: "Экран", width: 1920, height: 980 },
            { src: "/p.webp", alt: "Длинная страница", width: 1440, height: 6756 },
          ]}
        />,
      );
      expect(slide("Экран").style.aspectRatio).toBe("");
      expect(slide("Длинная страница").style.aspectRatio).toBe("");
    });
  });
});
