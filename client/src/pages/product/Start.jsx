import { useRouteLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import Confirm from "./Confirm";
import { useState } from "react";

const Start = () => {
  const configuration = useRouteLoaderData("configuration");
  const user = useRouteLoaderData("user");
  const { transaction } = user;
  const [isOpen, setIsOpen] = useState(false);

  const balance = transaction.balance.toFixed(2);
  const todaysIndividualIncome = transaction.todaysIncome.toFixed(2);
  const totalIndividualIncome = transaction.totalIncome.toFixed(2);

  const todaysOrderAmount = transaction.todaysOrderAmount.toFixed(2);

  const handleClick = () => {
    const options = { timeZone: "Asia/Riyadh", hour: "numeric" };
    const currentHour = new Date().toLocaleTimeString("en-GB", options);
    // conditions for product
    if (!(currentHour >= 10 && currentHour < 22)) {
      return toast.error("Allowed product time is 10:00 - 22:00 (Arabic Time)");
    } else if (transaction.todaysOrder >= configuration.orderPerDay) {
      return toast.error("Limit Exceeded");
    } else if (transaction.balance < 10) {
      return toast.error("Insufficent Balance");
    } else if (!user.trc20Address) {
      return toast.error("Please Bind ID to product");
    } else if (!configuration?.canTrade || !user?.canTrade) {
      return toast.error("Product is not available at the moment");
    } else {
      return setIsOpen(true);
      //return document.getElementById("confirm_dialog").showModal();
    }
  };
  // bg-[url('/images/trade_bg.png')] bg-no-repeat bg-center bg-origin-border
  return (
    <main className="min-h-screen">
      <h1 className="font-semibold text-center pt-2 mb-5">Product</h1>
      <section className="bg-[url('/images/bg/trade_bg.png')] bg-no-repeat bg-center bg-origin-border pb-20 px-2">
        <figure className="p-5 bg-white bg-opacity-80">
          <img src="/images/logo.png" alt="AFTAAI" className="mx-auto w-60" />
        </figure>
        <article className="w-full grid grid-cols-2 gap-4 text-center font-serif">
          <div className="col-span-2 bg-mySecondary bg-opacity-80 p-3 rounded-md">
            <h5 className="text-sm">Balance</h5>
            <p className="font-semibold">
              {balance} <span className="text-myPrimary">USDT</span>
            </p>
          </div>
          <div className="bg-mySecondary bg-opacity-80 p-3 rounded-md">
            <p className="font-semibold">
              {todaysIndividualIncome}{" "}
              <span className="text-myPrimary">USDT</span>
            </p>
            <h5 className="text-sm">Today&apos;s Earn</h5>
          </div>
          <div className="bg-mySecondary bg-opacity-80 p-3 rounded-md">
            <p className="font-semibold">
              {totalIndividualIncome}{" "}
              <span className="text-myPrimary">USDT</span>
            </p>
            <h5 className="text-sm">Total Earn</h5>
          </div>
          <div className="col-span-2 bg-mySecondary bg-opacity-80 p-3 rounded-md">
            <h5 className="text-sm">Today&apos;s Product Amount</h5>
            <p className="font-semibold">
              {todaysOrderAmount} <span className="text-myPrimary">USDT</span>
            </p>
          </div>
          <button
            className="col-span-2 btn btn-myPrimary  font-semibold rounded-md"
            onClick={handleClick}
          >
            Start
          </button>
        </article>
        <Confirm isOpen={isOpen} setIsOpen={setIsOpen} />
      </section>
    </main>
  );
};
export default Start;
