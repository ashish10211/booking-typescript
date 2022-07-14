import type { MenuState } from "../feature/cart/menuSlice";
import { CHEESECAKE, PRAWN_COCKTAILS, SALMON_FILLET } from "./constants";

export type ErrorTypes =
  | "OneMainCourseError"
  | "AtleastTwoCoursesError"
  | "NoCheesecakeError"
  | "CannotOrderPrawnSalmonTogetherError";

type RuleReturnType = { success: true } | { success: false; error: ErrorTypes };

export type Rule = (state: MenuState, customers: string[]) => RuleReturnType;

export const oneMainCourseRule: Rule = (
  menuState: MenuState,
  customers: string[]
) => {
  for (const customer of customers) {
    if (!menuState.main.some((main) => main.customerId === customer)) {
      return { success: false, error: "OneMainCourseError" };
    }
  }
  return { success: true };
};

export const atLeastTwoCoursesRule: Rule = (
  menuState: MenuState,
  customers: string[]
) => {
  const allCourses = [
    ...menuState.starter,
    ...menuState.main,
    ...menuState.dessert,
  ];
  for (const customer of customers) {
    if (
      allCourses.filter((course) => course.customerId === customer).length < 2
    ) {
      return { success: false, error: "AtleastTwoCoursesError" };
    }
  }
  return { success: true };
};

export const prawnSalmonRule: Rule = (menuState: MenuState) => {
  const allCourses = [
    ...menuState.starter,
    ...menuState.main,
    ...menuState.dessert,
  ];

  const prawns = allCourses.filter((course) => course.id === PRAWN_COCKTAILS);
  const cocktails = allCourses.filter((course) => course.id === SALMON_FILLET);
  if (prawns.length && cocktails.length) {
    return { success: false, error: "CannotOrderPrawnSalmonTogetherError" };
  }
  return { success: true };
};

export const cheesecakeRule: Rule = (menuState: MenuState) => {
  const allCourses = [
    ...menuState.starter,
    ...menuState.main,
    ...menuState.dessert,
  ];
  if (allCourses.filter((course) => course.id === CHEESECAKE).length > 1) {
    return { success: false, error: "NoCheesecakeError" };
  }
  return { success: true };
};
