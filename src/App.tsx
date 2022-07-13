import React, { useState } from "react";
import "./App.css";
import Header from "./Header";

const FoodCourse: React.FC<{
  type: "Starter" | "Main" | "Desserts";
  foods: { id: string; name: string; price: number }[];
}> = ({ type, foods }) => {
  return (
    <div className="font-bold text-xl">
      {type}
      <div className="flex flex-wrap">
        {foods.map((food) => {
          return (
            <div
              id={food.id}
              className="w-48 h-48 bg-red-500 mx-5 my-5 border-black border-2"
            >
              <p>{food.name}</p>
              <p>{food.price}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

function App() {
  const [bookingCount, setBookingCount] = useState("1");

  console.log("bookingCount", bookingCount);

  return (
    <div className="bg-slate-200 App">
      <Header />
      <span className="font-bold my-5 pt-5">
        How many people you are you booking for :&nbsp; &nbsp;
      </span>
      <select
        name="bookings"
        value={bookingCount}
        onChange={(e) => {
          setBookingCount(e.target.value);
        }}
      >
        <option value="1">1</option>
        <option value="2">2</option>
      </select>
      <div className="flex justify-center">
        <main style={{ width: 1200 }}>
          <FoodCourse
            type="Starter"
            foods={[
              { id: "1", name: "Steak", price: 12 },
              { id: "2", name: "Meatball", price: 12 },
              { id: "2", name: "Meatball", price: 12 },
              { id: "2", name: "Meatball", price: 12 },
              { id: "2", name: "Meatball", price: 12 },
              { id: "2", name: "Meatball", price: 12 },
              { id: "2", name: "Meatball", price: 12 },
              { id: "2", name: "Meatball", price: 12 },
            ]}
          />
          <FoodCourse
            type="Main"
            foods={[
              { id: "1", name: "Steak", price: 12 },
              { id: "2", name: "Meatball", price: 12 },
            ]}
          />
          <FoodCourse
            type="Desserts"
            foods={[
              { id: "1", name: "Steak", price: 12 },
              { id: "2", name: "Meatball", price: 12 },
            ]}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
