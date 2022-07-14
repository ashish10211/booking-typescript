import { Starter, Main, Dessert } from "./Menu";

const Food: React.FC<{ customerId: string }> = ({ customerId }) => {
  return (
    <div className="flex justify-center mt-5">
      <main style={{ width: 1200 }}>
        <Starter
          customerId={customerId}
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
          customerId={customerId}
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
          customerId={customerId}
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
};
export default Food;
