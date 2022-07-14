import { useState } from "react";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import { useAppSelector } from "./app/hook";
import Food from "./Food";

function App() {
  const [customers, setCustomers] = useState(["1"]);
  const [selectedCustomer, setSelectedCustomer] = useState("1");

  const cartState = useAppSelector((state) => state.cart);

  return (
    <div className="App mb-32">
      <Header />
      <span className="font-bold text-xl">
        Select how many people you are ordering for :&nbsp;
      </span>
      <select
        name="bookings"
        className="mt-5"
        onChange={(e) => {
          if (e.target.value === "1") {
            setCustomers(["1"]);
          }
          if (e.target.value === "2") {
            setCustomers(["1", "2"]);
          }
        }}
      >
        <option value="1">1</option>
        <option value="2">2</option>
      </select>

      <div>
        {customers.map((customerId) => {
          return (
            <button
              className={`w-5 ${
                customerId === selectedCustomer ? "bg-green-500" : "bg-red-500"
              } `}
              key={customerId}
              onClick={() => {
                setSelectedCustomer(customerId);
              }}
              id={customerId}
            >
              {customerId}
            </button>
          );
        })}
      </div>

      {customers.map((customer) => {
        return (
          <div
            key={customer}
            className={customer === selectedCustomer ? "block" : "hidden"}
          >
            Selected customer {customer}
            <Food customerId={customer} />
          </div>
        );
      })}

      <Footer
        customers={customers}
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
