const Person: React.FC<{ customers: string }> = ({ customers }) => {
  return (
    <div>
      <div
        className="
 text-m mx-2 flex h-[45px] w-[200px] items-center justify-center font-bold"
      >
        Ordering for {customers} Person
      </div>
    </div>
  );
};
export default Person;
