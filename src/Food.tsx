import { Starter, Main, Dessert } from "./Menu";
import { MenuSchema } from "./hook/useMenuData";

const Food: React.FC<{ customerId: string; data: MenuSchema }> = ({
  customerId,
  data,
}) => {
  return (
    <div className="mt-5 flex justify-center">
      <main style={{ width: 1200 }}>
        <Starter customerId={customerId} foods={data.starters} />
        <Main customerId={customerId} foods={data.mains} />
        <Dessert customerId={customerId} foods={data.desserts} />
      </main>
    </div>
  );
};
export default Food;
