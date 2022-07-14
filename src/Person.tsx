import { useAppSelector } from "./app/hook";

const Person: React.FC = () => {
  const displayButton = useAppSelector((state) => state.count);
  return (
    <div>
      <button
        className="bg-green-400
 mx-2  font-medium h-[45px] w-[200px] rounded"
      >
        {displayButton.count} Person
      </button>
    </div>
  );
};
export default Person;
