import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/hook";
import { setError } from "./feature/error/error";
import Person from "./Person";
import openTableRuleValidator from "./rulesEngine";

const Footer: React.FC<{ amount: string; customers: string[] }> = ({
  amount,
  customers,
}) => {
  const cartState = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const errorState = useAppSelector((state) => state.error);
  const [buttonText, setButtonText] = useState("Make A Booking");
  const [buttonColor, setButtonColor] = useState("bg-blue-500");

  const checkRules = (e: React.SyntheticEvent) => {
    const res = openTableRuleValidator(cartState, customers);
    if (res.success) {
      setButtonText("Order Complete");
      setButtonColor("bg-green-500");
    }
    dispatch(setError(res));
  };

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[1]
        border-t border-neutral-200 bg-white/80 px-4 pt-3 backdrop-blur-sm sm:block"
    >
      <div className="h-30 mx-auto flex w-full max-w-[450px] flex-col items-center justify-center pb-5 ">
        {!errorState.success ? (
          <>
            {errorState.errors?.map((item) => {
              return (
                <span key={item} className="font-thin text-red-500">
                  {item}
                </span>
              );
            })}
          </>
        ) : (
          <></>
        )}
        <Person customers={customers.length.toString()} />
        <p>
          <span className="font-bold">Total Amount: &nbsp;</span>
          <span className="font-medium">{amount} AUD</span>
        </p>
        <button
          className={`${buttonColor} roundedfont-medium h-[45px] w-[200px] hover:border hover:border-black`}
          onClick={checkRules}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};
export default Footer;
