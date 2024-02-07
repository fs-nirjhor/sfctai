import { useRouteLoaderData } from "react-router-dom";
import { useState } from "react";
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
    const options = { timeZone: "Europe/London", hour: "numeric" };
    const currentHour = new Date().toLocaleTimeString("en-GB", options);
    if (!(currentHour >= 9 && currentHour < 21)) {
      setError("Allowed order time is 09:00 - 21:00 (UK)");
      return document.getElementById("start-error").showModal();
    } else if (transaction.todaysOrder >= configuration.orderPerDay) {
      setError("Limit Exceeded");
      return document.getElementById("start-error").showModal();
    } else if (transaction.balance < 10) {
      setError("Insufficent Balance");
      return document.getElementById("start-error").showModal();
    } else if (!user.trc20Address) {
      setError("Please Bind ID to order");
      return document.getElementById("start-error").showModal();
    } else {
      return document.getElementById("confirm_dialog").showModal();
    }
  };
// bg-[url('/images/start_bg.png')] bg-no-repeat bg-center bg-origin-border
  return (
    <section>
      <figure className="p-5">
        <img src="/images/logo.png" alt="logo" className="mx-auto w-44" />
      </figure>
      <article className="grid grid-cols-2 gap-4 my-5 text-center">
        <div className="col-span-2 bg-mySecondary bg-opacity-50 p-3 rounded-md">
          <h5 className="text-sm">Balance</h5>
          <p className="font-semibold">
            {balance} <span className="text-myPrimary">USDT</span>
          </p>
        </div>
        <div className="bg-mySecondary bg-opacity-50 p-3 rounded-md">
          <h5 className="text-sm">Today&apos;s Income</h5>
          <p className="font-semibold">
            {todaysIndividualIncome}{" "}
            <span className="text-myPrimary">USDT</span>
          </p>
        </div>
        <div className="bg-mySecondary bg-opacity-50 p-3 rounded-md">
          <h5 className="text-sm">Today&apos;s Team Income</h5>
          <p className="font-semibold">
            {todaysTeamIncome} <span className="text-myPrimary">USDT</span>
          </p>
        </div>
        <div className="bg-mySecondary bg-opacity-50 p-3 rounded-md">
          <h5 className="text-sm">Total Individual Income</h5>
          <p className="font-semibold">
            {totalIndividualIncome} <span className="text-myPrimary">USDT</span>
          </p>
        </div>
        <div className="bg-mySecondary bg-opacity-50 p-3 rounded-md">
          <h5 className="text-sm">Total Team Income</h5>
          <p className="font-semibold">
            {totalTeamIncome} <span className="text-myPrimary">USDT</span>
          </p>
        </div>
        <div className="col-span-2 bg-mySecondary bg-opacity-50 p-3 rounded-md">
          <h5 className="text-sm">Today&apos;s Order Amount</h5>
          <p className="font-semibold">
            {todaysOrderAmount} <span className="text-myPrimary">USDT</span>
          </p>
        </div>
        <button
          className="col-span-2 btn btn-warning bg-myPrimary text-white font-semibold"
          onClick={handleClick}
        >
          Trade
        </button>
      </article>
      <AlertBox id="start-error" text={error} alertType="alert-error" />
    </section>
  );
};
export default Start;
