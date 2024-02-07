import { useEffect, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import { transactionApi } from "../../router/axiosApi";
import AlertBox from "../shared/AlertBox";
import { coincapApi } from "../../data/config";

const Confirm = () => {
  const user = useRouteLoaderData("user");
  const configuration = useRouteLoaderData("configuration");
  const [error, setError] = useState("")
  const [time, setTime] = useState(
    new Date().toLocaleTimeString("en-GB", { timeZone: "Europe/London" })
  );
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // set coin
      const getCoins = async () => {
        try {
          const response = await fetch(
            `https://api.coincap.io/v2/assets?limit=10&apiKey=${coincapApi}`
          );
          const data = await response.json();
          if (data.data) {
          
          
          setCoin(data.data);
          setLoading(false);
          }
        } catch (err) {
          setError(err.message);
          document.getElementById("order-error").showModal();
        }
      };
      getCoins(); 
  
    // set time 
    const timer = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("en-GB", { timeZone: "Europe/London" })
      );
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  // order 
  const currentBalance = Number(user.transaction.balance)
  const monthlyProfit = Number(configuration.monthlyProfit);
  const orderPerDay = Number(configuration.orderPerDay);

  const estimateRevenue = Number(currentBalance*monthlyProfit/100/orderPerDay);
  const orderAmount = Number(currentBalance-estimateRevenue);

  const handleClick = async () => {
    // order data
    const transaction = { client: user._id, userId: user.userId, category: "Order", amount: currentBalance, estimateRevenue: estimateRevenue};
    try {
      const res = await transactionApi.post("order-request",{transaction});
      
      if(res.data?.success) {
        document.getElementById("order-success").showModal();
        document.getElementById("confirm_dialog").close()
        window.location.reload();
      }

    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError(err.message);
      }
      document.getElementById("order-error").showModal();
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
          <img src="/images/wallet/huobi.png" alt="huobi" />
        </div>
        <h2 className="mb-5 text-xl font-semibold text-center">
          Huobi Currency Order
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
          <button className="btn btn-block btn-warning bg-myPrimary text-white" onClick={handleClick}>
            Confirm
          </button>
        </figure>
      </div>
      <AlertBox id="order-error" text={error} alertType="alert-error" />
    </dialog>
  );
};
export default Confirm;
