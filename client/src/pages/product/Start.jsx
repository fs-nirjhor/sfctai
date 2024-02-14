import { useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import AlertBox from "../shared/AlertBox";

const Start = () => {
  const configuration = useRouteLoaderData("configuration");
  const user = useRouteLoaderData("user");
  const { transaction } = user;
  const [error, setError] = useState("");

  const balance = transaction.balance.toFixed(4);
  const todaysIndividualIncome = transaction.todaysIncome.toFixed(4);
  const totalIndividualIncome = transaction.totalIncome.toFixed(4);

  const todaysTeamIncome = transaction.todaysTeamIncome.toFixed(4);
  const totalTeamIncome = transaction.totalTeamIncome.toFixed(4);
  const todaysOrderAmount = transaction.todaysOrderAmount.toFixed(4);

  const handleClick = () => {
    const options = { timeZone: "Asia/Riyadh", hour: "numeric" };
    const currentHour = new Date().toLocaleTimeString("en-GB", options);
    if (!(currentHour >= 10 && currentHour < 22)) {
      setError("Allowed trade time is 10:00 - 22:00 (Arabic Time)");
      return document.getElementById("trade-error").showModal();
    } else if (transaction.todaysOrder >= configuration.orderPerDay) {
      setError("Limit Exceeded");
      return document.getElementById("trade-error").showModal();
    } else if (transaction.balance < 10) {
      setError("Insufficent Balance");
      return document.getElementById("trade-error").showModal();
    } else if (!user.trc20Address) {
      setError("Please Bind ID to trade");
      return document.getElementById("trade-error").showModal();
    } else {
      return document.getElementById("confirm_dialog").showModal();
    }
  };
  // bg-[url('/images/start_bg.png')] bg-no-repeat bg-center bg-origin-border
  return (
    <section>
      <figure className="p-5">
        <img src="/images/logo.png" alt="STFAI" className="mx-auto w-44" />
      </figure>
      <div className="relative my-5 h-[24rem]">
        <video
          className="w-full h-full rounded-md absolute inset-0 object-cover"
          autoPlay
          loop
          muted
        >
          <source src="/videos/tradeVideo.mp4" type="video/mp4" />
        </video>
        <article className="absolute w-full grid grid-cols-2 gap-4 text-center font-serif">
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
            <h5 className="text-sm">Today&apos;s Team Earn</h5>
            <p className="font-semibold text-white">
              {todaysTeamIncome} <span className="text-myPrimary">USDT</span>
            </p>
          </div>
          <div className="bg-mySecondary bg-opacity-50 p-3 rounded-md">
            <h5 className="text-sm">Total Individual Earn</h5>
            <p className="font-semibold text-white">
              {totalIndividualIncome}{" "}
              <span className="text-myPrimary">USDT</span>
            </p>
          </div>
          <div className="bg-mySecondary bg-opacity-50 p-3 rounded-md">
            <h5 className="text-sm">Total Team Earn</h5>
            <p className="font-semibold text-white">
              {totalTeamIncome} <span className="text-myPrimary">USDT</span>
            </p>
          </div>
          <div className="col-span-2 bg-mySecondary bg-opacity-50 p-3 rounded-md">
            <h5 className="text-sm">Today&apos;s Trade Amount</h5>
            <p className="font-semibold text-white">
              {todaysOrderAmount} <span className="text-myPrimary">USDT</span>
            </p>
          </div>
          <button
            className="col-span-2 btn btn-warning bg-myPrimary text-white font-semibold rounded-md"
            onClick={handleClick}
          >
            Trade
          </button>
        </article>
      </div>
      <AlertBox id="trade-error" text={error} position="center"/>
    </section>
  );
};
export default Start;
