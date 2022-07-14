import { useAppSelector } from "./app/hook";
import React, { useMemo } from "react";
import FoodCourse from "./FoodCourse";

export type Food = { id: string; name: string; price: number };

export const Starter: React.FC<{ foods: Food[]; customerId: string }> = ({
  foods,
  customerId,
}) => {
  const starters = useAppSelector((state) => state.cart.starter);
  const selectedFoods = useMemo(() => {
    return starters.filter((starter) => starter.customerId === customerId);
  }, [starters, customerId]);
  return (
    <FoodCourse
      selectedFoods={selectedFoods}
      foods={foods}
      type="starter"
      customerId={customerId}
    />
  );
};

export const Main: React.FC<{ foods: Food[]; customerId: string }> = ({
  foods,
  customerId,
}) => {
  const mains = useAppSelector((state) => state.cart.main);
  const selectedFoods = useMemo(() => {
    return mains.filter((main) => main.customerId === customerId);
  }, [mains, customerId]);
  return (
    <FoodCourse
      selectedFoods={selectedFoods}
      foods={foods}
      type="main"
      customerId={customerId}
    />
  );
};

export const Dessert: React.FC<{ foods: Food[]; customerId: string }> = ({
  foods,
  customerId,
}) => {
  const desserts = useAppSelector((state) => state.cart.dessert);
  const selectedFoods = useMemo(() => {
    return desserts.filter((dessert) => dessert.customerId === customerId);
  }, [desserts, customerId]);
  return (
    <FoodCourse
      selectedFoods={selectedFoods}
      foods={foods}
      type="dessert"
      customerId={customerId}
    />
  );
};
