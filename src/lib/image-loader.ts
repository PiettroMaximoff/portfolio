/**
 * Загрузчик картинок для статического экспорта (GitHub Pages): встроенная оптимизация
 * next/image без сервера недоступна, а сайт лежит в подпапке, поэтому добавляем её к адресу.
 * Подключается в next.config.ts только для сборки под Pages.
 */
export default function imageLoader({ src }: { src: string }) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}`;
}
