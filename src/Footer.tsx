import { useAppSelector } from "./app/hook";
import Person from "./Person";
import openTableRuleValidator from "./rulesEngine";

const Footer: React.FC<{ amount: string; customers: string[] }> = ({
  amount,
  customers,
}) => {
  const cartState = useAppSelector((state) => state.cart);

  const checkRules = (e: React.SyntheticEvent) => {
    const res = openTableRuleValidator(cartState, customers);
    console.log("res", res);
  };

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[1]
        border-t border-neutral-200 bg-white/80 px-4 pt-3 backdrop-blur-sm sm:block"
    >
      <div className="mx-auto w-full max-w-[450px] pb-5 h-30 flex items-center justify-center flex-col ">
        <Person customers={customers.length.toString()} />
        <p>
          <span className="font-bold">Total Amount: &nbsp;</span>
          <span className="font-medium">{amount} AUD</span>
        </p>
        <button
          className="h-[45px] w-[200px] rounded bg-green-400 hover:border font-medium hover:border-black"
          onClick={checkRules}
        >
          Make A Booking
        </button>
      </div>
    </div>
  );
};
export default Footer;
