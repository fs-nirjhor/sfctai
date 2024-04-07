import { useRouteLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import Confirm from "./Confirm";
import { useState } from "react";

const Trade = () => {
  const configuration = useRouteLoaderData("configuration");
  const user = useRouteLoaderData("user");
  const { transaction } = user;
  const [isOpen, setIsOpen] = useState(false);

  const balance = transaction.balance.toFixed(2);
  const todaysIndividualIncome = transaction.todaysIncome.toFixed(2);
  const totalIndividualIncome = transaction.totalIncome.toFixed(2);

  const todaysOrderAmount = transaction.todaysOrderAmount.toFixed(2);

  const handleClick = () => {
    console.log(isOpen);
    const options = { timeZone: "Asia/Riyadh", hour: "numeric" };
    const currentHour = new Date().toLocaleTimeString("en-GB", options);
    if (!(currentHour >= 10 && currentHour < 22)) {
      return toast.error("Allowed trade time is 10:00 - 22:00 (Arabic Time)");
    } else if (transaction.todaysOrder >= configuration.orderPerDay) {
      return toast.error("Limit Exceeded");
    } else if (transaction.balance < 10) {
      return toast.error("Insufficent Balance");
    } else if (!user.trc20Address) {
      return toast.error("Please Bind ID to trade");
    } else {
      return setIsOpen(true);
      //return document.getElementById("confirm_dialog").showModal();
    }
  };
  // bg-[url('/images/start_bg.png')] bg-no-repeat bg-center bg-origin-border
  return (
    <main className="bg-[url('/images/bg/tradeBg.jpg')] bg-repeat-y bg-center bg-origin-border min-h-screen">
      <h1 className="font-semibold text-center pt-2 mb-5">Copy Trade</h1>
      <section className="pb-20 px-2">
        <figure className="p-5">
          <img src="/images/logo.png" alt="AFTAAI" className="mx-auto w-60" />
        </figure>
        <div className="relative my-5 h-[16rem]">
          <video
            className="w-full h-full rounded-md absolute inset-0 object-cover"
            autoPlay
            loop
            muted
          >
            <source src="/videos/tradeVideo.mp4" type="video/mp4" />
          </video>
          <article className="absolute w-full grid grid-cols-2 gap-4 text-center font-serif bg-gray-500 bg-opacity-80">
            <div className="col-span-2 bg-mySecondary bg-opacity-50 p-3 rounded-md">
              <h5 className="text-sm">Balance</h5>
              <p className="font-semibold text-white">
                {balance} <span className="text-myPrimary">USDT</span>
              </p>
            </div>
            <div className="bg-mySecondary bg-opacity-50 p-3 rounded-md">
              <h5 className="text-sm">Today&apos;s Earn</h5>
              <p className="font-semibold text-white">
                {todaysIndividualIncome}{" "}
                <span className="text-myPrimary">USDT</span>
              </p>
            </div>
            <div className="bg-mySecondary bg-opacity-50 p-3 rounded-md">
              <h5 className="text-sm">Total Earn</h5>
              <p className="font-semibold text-white">
                {totalIndividualIncome}{" "}
                <span className="text-myPrimary">USDT</span>
              </p>
            </div>
            <div className="col-span-2 bg-mySecondary bg-opacity-50 p-3 rounded-md">
              <h5 className="text-sm">Today&apos;s Trade Amount</h5>
              <p className="font-semibold text-white">
                {todaysOrderAmount} <span className="text-myPrimary">USDT</span>
              </p>
            </div>
            <button
              className="col-span-2 btn bg-white text-black font-semibold rounded-md"
              onClick={handleClick}
            >
              Trade
            </button>
          </article>
        </div>
        <Confirm isOpen={isOpen} setIsOpen={setIsOpen} />
      </section>
    </main>
  );
};
export default Trade;
