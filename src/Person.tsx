const Person: React.FC<{ customers: string }> = ({ customers }) => {
  return (
    <div>
      <div
        className="
 mx-2 h-[45px] w-[200px] font-bold text-m flex items-center justify-center"
      >
        Ordering for {customers} Person
      </div>
    </div>
  );
};
export default Person;
