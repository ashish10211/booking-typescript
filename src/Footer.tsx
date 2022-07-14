import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/hook";
import { setError } from "./feature/error/error";
import Person from "./Person";
import openTableRuleValidator from "./rulesEngine";
import { ErrorTypes } from "./rulesEngine/rules";

type OrderStatus = "Initial" | "Success";

const getErrorMessage = (error: ErrorTypes) => {
  switch (error) {
    case "OneMainCourseError":
      return "Please select atleast one main course";
    case "AtleastTwoCoursesError":
      return "Please select atleast two course";
    case "CannotOrderPrawnSalmonTogetherError":
      return "Cannot have prawn cocktail and salmon fillet";
    case "NoCheesecakeError":
      return "Sorry no cheescake left";
    default:
      return "";
  }
};

const Footer: React.FC<{ amount: string; customers: string[] }> = ({
  amount,
  customers,
}) => {
  const cartState = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const errorState = useAppSelector((state) => state.error.errors);
  const [orderStatus, setOrderStatus] = useState<OrderStatus>("Initial");

  const checkRules = (e: React.SyntheticEvent) => {
    const res = openTableRuleValidator(cartState, customers);
    if (res.success) {
      setOrderStatus("Success");
    }
    dispatch(setError({ errors: res.errors }));
  };

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[1]
        border-t border-neutral-200 bg-white/80 px-4 pt-3 backdrop-blur-sm sm:block"
    >
      <div className="h-30 mx-auto flex w-full max-w-[450px] flex-col items-center justify-center pb-5 ">
        {errorState.map((error) => {
          return (
            <span key={error} className="font-thin text-red-500">
              {getErrorMessage(error)}
            </span>
          );
        })}
        <Person customers={customers.length.toString()} />
        <p>
          <span className="font-bold">Total Amount: &nbsp;</span>
          <span className="font-medium">{amount} AUD</span>
        </p>
        <button
          className={`${
            orderStatus === "Success" ? "bg-green-500" : "bg-blue-500"
          } roundedfont-medium h-[45px] w-[200px] hover:border hover:border-black`}
          onClick={checkRules}
        >
          {orderStatus === "Success" ? "Order Complete" : "Make A Booking"}
        </button>
      </div>
    </div>
  );
};
export default Footer;
