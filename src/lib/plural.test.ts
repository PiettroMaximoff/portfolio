import { describe, expect, it } from "vitest";
import { pluralRu, screenshotsLabel } from "./plural";

describe("pluralRu", () => {
  const form = (n: number) => pluralRu(n, "один", "несколько", "много");

  it.each([
    [1, "один"],
    [21, "один"],
    [101, "один"],
    [2, "несколько"],
    [3, "несколько"],
    [4, "несколько"],
    [22, "несколько"],
    [0, "много"],
    [5, "много"],
    [10, "много"],
    [20, "много"],
  ])("%i → %s", (count, expected) => {
    expect(form(count)).toBe(expected);
  });

  it.each([11, 12, 13, 14, 111, 112, 214])("исключение для %i: «много»", (count) => {
    expect(form(count)).toBe("много");
  });
});

describe("screenshotsLabel", () => {
  it.each([
    [1, "1 скриншот"],
    [2, "2 скриншота"],
    [5, "5 скриншотов"],
    [14, "14 скриншотов"],
    [22, "22 скриншота"],
  ])("%i → %s", (count, expected) => {
    expect(screenshotsLabel(count)).toBe(expected);
  });
});
