import {
  atLeastTwoCoursesRule,
  cheesecakeRule,
  oneMainCourseRule,
  prawnSalmonRule,
} from "./rules";
import { MenuState } from "../feature/cart/menuSlice";

const courseState: MenuState = {
  main: [
    {
      id: 1,
      name: "Main-1",
      price: 12,
      customerId: "1",
    },
    {
      id: 1,
      name: "Main-1",
      price: 12,
      customerId: "2",
    },
  ],
  starter: [
    {
      id: 7,
      name: "Prawn",
      price: 12,
      customerId: "1",
    },
    {
      id: 4,
      name: "salmon",
      price: 12,
      customerId: "1",
    },
  ],
  dessert: [
    {
      id: 11,
      name: "cheesecake",
      price: 12,
      customerId: "1",
    },
    {
      id: 6,
      name: "dessert-2",
      price: 12,
      customerId: "2",
    },
    {
      id: 11,
      name: "cheesecake",
      price: 12,
      customerId: "2",
    },
  ],
};

describe("oneMainCourseRule()", () => {
  it("should have atleast one main course per customer", () => {
    const result = oneMainCourseRule(courseState, ["1", "2"]);
    expect(result.success).toBe(true);
  });
  const tempState = { ...courseState, main: [] };
  it("should fail if there are no main courses for both customers", () => {
    const result = oneMainCourseRule(tempState, ["1", "2"]);
    expect(result.success).toBe(false);
  });
  const courseStateAppended: MenuState = {
    main: [
      {
        id: 1,
        name: "Main-1",
        price: 12,
        customerId: "1",
      },
    ],
    starter: [
      {
        id: 7,
        name: "Prawn",
        price: 12,
        customerId: "1",
      },
      {
        id: 4,
        name: "starters-2",
        price: 12,
        customerId: "2",
      },
    ],
    dessert: [],
  };
  it("should fail if one customer has a main course and one doesnt", () => {
    const result = oneMainCourseRule(courseStateAppended, ["1", "2"]);
    expect(result.success).toBe(false);
  });
});

describe("atLeastTwoCoursesRule", () => {
  it("should pass if both customers have atleast two course selected", () => {
    const result = atLeastTwoCoursesRule(courseState, ["1", "2"]);
    expect(result.success).toBe(true);
  });
  const tempState = {
    ...courseState,
    main: [{ id: 1, name: "steak", price: 15, customerId: "1" }],
    starter: [],
    dessert: [],
  };
  it("should fail if one customer have selected only one course", () => {
    const result = atLeastTwoCoursesRule(tempState, ["1"]);
    expect(result.success).toBe(false);
  });
  const tempState2 = {
    ...courseState,
    main: [
      { id: 1, name: "steak", price: 15, customerId: "1" },
      { id: 1, name: "steak", price: 15, customerId: "2" },
    ],
    starter: [],
    dessert: [],
  };
  it("should fail if both customers have selected only one course", () => {
    const result = atLeastTwoCoursesRule(tempState2, ["1", "2"]);
    expect(result.success).toBe(false);
  });
});

describe("prawnSalmonRule", () => {
  it("Should fail if prawn cocktail and salmon is selected", () => {
    const result = prawnSalmonRule(courseState, ["1", "2"]);
    expect(result.success).toBe(false);
  });
});

describe("cheesecakeRule", () => {
  it("Should fail if two cheesecakes are selected", () => {
    const result = cheesecakeRule(courseState, ["1", "2"]);
    expect(result.success).toBe(false);
  });
});
