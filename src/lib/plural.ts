/** Русское склонение: 1 скриншот, 2 скриншота, 5 скриншотов, 11 скриншотов, 21 скриншот. */
export function pluralRu(count: number, one: string, few: string, many: string) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}

export function screenshotsLabel(count: number) {
  return `${count} ${pluralRu(count, "скриншот", "скриншота", "скриншотов")}`;
}
