import React, { useMemo, useState } from "react";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import { useAppDispatch, useAppSelector } from "./app/hook";
import {
  addMenuItem,
  MenuState,
  MenuItem,
  removeMenuItem,
} from "./feature/cart/menuSlice";
import { setBookingCount } from "./feature/option/optionSlice";

type Food = { id: string; name: string; price: number };

const Starter: React.FC<{ foods: Food[]; customerId: string }> = ({
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
const Main: React.FC<{ foods: Food[]; customerId: string }> = ({
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

const Dessert: React.FC<{ foods: Food[]; customerId: string }> = ({
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

function App() {
  const [selectedPerson, setSelectedPerson] = useState("0");
  const cartState = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  console.log("selectedPerson", selectedPerson);

  const bookingCount = useAppSelector((state) => state.count.count);

  const tempArray = Array.from(Array(parseInt(bookingCount)).keys());

  return (
    <div className="App mb-32">
      <Header />
      {tempArray.map((item) => {
        return (
          <button
            onClick={() => {
              setSelectedPerson(item.toString());
            }}
            id={item.toString()}
          ></button>
        );
      })}
      <span className="font-bold text-xl">
        Select how many people you are ordering for :&nbsp;
      </span>
      <select
        name="bookings"
        value={bookingCount}
        className="mt-5"
        onChange={(e) => {
          dispatch(setBookingCount({ count: e.target.value }));
        }}
      >
        <option value="1">1</option>
        <option value="2">2</option>
      </select>
      {tempArray.map((item) => {
        if (item.toString() !== selectedPerson) {
          return <div></div>;
        }
        return (
          <div className="flex justify-center mt-5">
            <main style={{ width: 1200 }}>
              <Starter
                customerId={item.toString()}
                foods={[
                  { id: "1", name: "Steak", price: 12 },
                  { id: "2", name: "Meatball", price: 12 },
                  { id: "3", name: "Meatball", price: 12 },
                  { id: "4", name: "Meatball", price: 12 },
                  { id: "5", name: "Meatball", price: 12 },
                  { id: "6", name: "Meatball", price: 12 },
                  { id: "7", name: "Meatball", price: 12 },
                  { id: "8", name: "Meatball", price: 12 },
                ]}
              />
              <Main
                customerId={item.toString()}
                foods={[
                  { id: "9", name: "Steak", price: 12 },
                  { id: "10", name: "Meatball", price: 12 },
                  { id: "11", name: "Meatball", price: 12 },
                  { id: "12", name: "Meatball", price: 12 },
                  { id: "13", name: "Meatball", price: 12 },
                  { id: "14", name: "Meatball", price: 12 },
                  { id: "15", name: "Meatball", price: 12 },
                ]}
              />
              <Dessert
                customerId={item.toString()}
                foods={[
                  { id: "16", name: "Steak", price: 12 },
                  { id: "17", name: "Meatball", price: 12 },
                  { id: "18", name: "Meatball", price: 12 },
                  { id: "19", name: "Meatball", price: 12 },
                  { id: "20", name: "Meatball", price: 12 },
                  { id: "21", name: "Meatball", price: 12 },
                  { id: "22", name: "Meatball", price: 12 },
                ]}
              />
            </main>
          </div>
        );
      })}
      <Footer
        amount={[...cartState.starter, ...cartState.main, ...cartState.dessert]
          .reduce((acc, item) => {
            return acc + item.price;
          }, 0)
          .toString()}
      />
    </div>
  );
}

export default App;
