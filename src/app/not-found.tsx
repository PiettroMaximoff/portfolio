import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Страница не найдена — Владислав Ухлин",
};

export default function NotFound() {
  return (
    <main className="section">
      <div className="wrap section-head">
        <p className="kicker">404</p>
        <h1>Страница не найдена</h1>
        <p>
          Возможно, ссылка устарела или в адресе опечатка. Начните с{" "}
          <Link className="fill-reveal" href="/">
            главной
          </Link>{" "}
          или откройте{" "}
          <Link className="fill-reveal" href="/projects">
            все проекты
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
