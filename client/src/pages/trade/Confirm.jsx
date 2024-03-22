import { useEffect, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import { transactionApi } from "../../router/axiosApi";
import { coincapApi } from "../../configuration/config";
import { toast } from "react-toastify";

const Confirm = () => {
  const user = useRouteLoaderData("user");
  const configuration = useRouteLoaderData("configuration");
  const [time, setTime] = useState(
    new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Riyadh" })
  );
  const [coin, setCoin] = useState({});
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    // set coin
    const getCoins = async () => {
      try {
        const response = await fetch(
          `https://api.coincap.io/v2/assets?limit=10&apiKey=${coincapApi}`
        );
        const data = await response.json();
        if (data.data) {
          const allCoins = data.data;
          const balance = user.transaction.balance;
          const manageCoin = (index) => {
            const usersCoin = allCoins[index];
            const image = `https://assets.coincap.io/assets/icons/${usersCoin.symbol?.toLowerCase()}@2x.png`;
            usersCoin.image = image;
            setCoin(usersCoin);
          };
          if (balance >= 10 && balance <= 50) {
            manageCoin(9);
          } else if (balance >= 51 && balance <= 100) {
            manageCoin(8);
          } else if (balance >= 101 && balance <= 150) {
            manageCoin(7);
          } else if (balance >= 151 && balance <= 200) {
            manageCoin(6);
          } else if (balance >= 201 && balance <= 300) {
            manageCoin(5);
          } else if (balance >= 301 && balance <= 350) {
            manageCoin(4);
          } else if (balance >= 351 && balance <= 450) {
            manageCoin(3);
          } else if (balance >= 451 && balance <= 550) {
            manageCoin(2);
          } else if (balance >= 551 && balance <= 800) {
            manageCoin(1);
          } else {
            manageCoin(0);
          }
        }
      } catch (err) {
        toast.error(err.message);
      }
    };
    getCoins();
    // set time
    const timer = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Riyadh" })
      );
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [user.transaction.balance]);

  // order
  const currentBalance = Number(user.transaction.balance);
  const monthlyProfit = Number(configuration.monthlyProfit);
  const orderPerDay = Number(configuration.orderPerDay);

  const estimateRevenue = Number(
    (currentBalance * monthlyProfit) / 100 / orderPerDay
  );
  const orderAmount = Number(currentBalance - estimateRevenue);

  const handleClick = async () => {
    if (processing) {
      return toast.error("Try again later");
    }
    // order data
    const transaction = {
      client: user._id,
      userId: user.userId,
      category: "Order",
      amount: currentBalance,
      estimateRevenue: estimateRevenue,
      coin: coin.symbol,
    };
    try {
      setProcessing(true);
      document.getElementById("confirm_dialog").close();
      const res = await transactionApi.post("order-request", { transaction });

      if (res.data?.success) {
        toast.success("Trade confirmed");
        setProcessing(false);
        window.location.reload();
      }
    } catch (err) {
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error(err.message);
      }
      setProcessing(false);
    }
  };

  return (
    <dialog id="confirm_dialog" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div className="w-12 h-12 mx-auto mb-3">
          <img src={coin.image} alt="huobi" />
        </div>
        <h2 className="mb-5 text-xl font-semibold text-center">
          {coin.symbol} Currency Trade
        </h2>
        <figure className="font-semibold">
          <p className="flex justify-between bg-mySecondary p-3 mb-3 rounded-md">
            <span>Amount of money</span>
            <span>{orderAmount.toFixed(4)}</span>
          </p>
          <p className="flex justify-between bg-mySecondary p-3 mb-3 rounded-md">
            <span>Estimate Reveneu</span>
            <span>{estimateRevenue.toFixed(4)}</span>
          </p>
          <p className="flex justify-between bg-mySecondary p-3 mb-3 rounded-md">
            <span>Time</span>
            <span>{time}</span>
          </p>
          <p className="mb-5 text-center">
            Expect to take 10 to 15 minites to complete the order
          </p>
          <button
            className={`btn btn-block btn-primary ${
              processing && "btn-disabled"
            }`}
            onClick={handleClick}
          >
            Confirm
          </button>
        </figure>
      </div>
    </dialog>
  );
};
export default Confirm;
