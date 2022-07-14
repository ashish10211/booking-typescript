import { useState } from "react";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import { useAppSelector } from "./app/hook";
import Food from "./Food";
import useMenuData from "./hook/useMenuData";

function App() {
  const [customers, setCustomers] = useState(["1"]);
  const [selectedCustomer, setSelectedCustomer] = useState("1");
  const { data, err, isLoading } = useMenuData(
    "http://localhost:3000/api/menu"
  );
  const cartState = useAppSelector((state) => state.cart);

  if (err) {
    return <div>Something went wrong please try again.</div>;
  }

  if (!data || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App mb-32">
      <Header />
      <span className="text-xl font-bold">
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
            <Food customerId={customer} data={data} />
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
