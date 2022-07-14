import { useState } from "react";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import { useAppDispatch, useAppSelector } from "./app/hook";

import { setBookingCount } from "./feature/option/optionSlice";

import { Starter, Main, Dessert } from "./Menu";

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
