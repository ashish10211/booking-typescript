import {
  addMenuItem,
  MenuState,
  MenuItem,
  removeMenuItem,
} from "./feature/cart/menuSlice";
import { Food } from "./Menu";
import { useAppDispatch } from "./app/hook";
import React from "react";

const FoodCourse: React.FC<{
  selectedFoods: MenuItem[];
  type: keyof MenuState;
  foods: Food[];
  customerId: string;
}> = ({ type, foods, selectedFoods, customerId }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="font-bold text-3xl">
      {type[0].toUpperCase() + type.slice(1)}
      <div className="flex flex-wrap text-xl mt-2 ">
        {foods.map((food) => {
          return (
            <button
              onClick={() => {
                if (
                  selectedFoods.some(
                    (selectedFood) => selectedFood.id === food.id
                  )
                ) {
                  dispatch(removeMenuItem({ id: food.id, type, customerId }));
                  return;
                }
                dispatch(
                  addMenuItem({
                    id: food.id,
                    name: food.name,
                    price: food.price,
                    customerId,
                    type,
                  })
                );
              }}
              id={food.id}
              className={`w-48 h-48  mx-5 my-5 border-black border-2 hover:bg-sky-200 bg-red-500
                   ${
                     selectedFoods.some(
                       (selectedFood) => selectedFood.id === food.id
                     ) && " bg-green-500 "
                   }
                  `}
            >
              <p>{food.name}</p>
              <p>{food.price}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FoodCourse;
