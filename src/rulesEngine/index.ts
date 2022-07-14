import { MenuState } from "../feature/cart/menuSlice";
import {
  Rule,
  ErrorTypes,
  oneMainCourseRule,
  atLeastTwoCoursesRule,
  prawnSalmonRule,
  cheesecakeRule,
} from "./rules";

const createCombinedRules =
  (rules: Rule[]) => (menuState: MenuState, customers: string[]) => {
    const errors: ErrorTypes[] = [];

    for (const rule of rules) {
      const ruleResults = rule(menuState, customers);
      if (ruleResults.success === false) {
        errors.push(ruleResults.error);
      }
    }
    if (errors.length > 0) {
      return { success: false, errors: errors };
    }
    return { success: true };
  };

const openTableRuleValidator = createCombinedRules([
  oneMainCourseRule,
  atLeastTwoCoursesRule,
  prawnSalmonRule,
  cheesecakeRule,
]);

export default openTableRuleValidator;
