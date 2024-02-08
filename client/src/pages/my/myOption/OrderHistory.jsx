import { useEffect, useState } from "react";
import { transactionApi } from "../../../router/axiosApi";
import { useRouteLoaderData } from "react-router-dom";
import AlertBox from "./../../shared/AlertBox";
import Loading from "../../shared/Loading";
import moment from "moment";

const FundHistory = () => {
  const user = useRouteLoaderData("user");
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const filter = user.isAdmin
          ? { category: "Order" }
          : { client: user._id, category: "Order" };
        const response = await transactionApi.post("/", { filter });
        if (response.data?.success) {
          setOrders(response.data.payload.allTransaction);
          setOrders(response.data.payload.allTransaction);
          setLoading(false);
        }
      } catch (err) {
        if (err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError(err.message);
        }
        document.getElementById("order-error").showModal();
      }
    };
    getOrders();
  }, [user]);

  return loading ? (
    <Loading />
  ) : (
    <section className="pb-20">
      <h1 className="text-lg font-semibold text-center pt-2 mb-5">
        Order History
      </h1>
      <div>
        {orders.map((order) => {
          const createdDate = moment(order.createdAt).format(
            "DD/MM/YYYY HH:mm:ss"
          );
          const image = `https://assets.coincap.io/assets/icons/${order.coin?.toLowerCase()}@2x.png`;
          return (
            <figure
              key={order._id}
              className="bg-mySecondary p-2 mb-2 rounded text-center"
            >
              <article className="flex justify-between mb-3">
                <img src={image} alt={order.coin} className="h-10" />
                <p>{order.coin} Currency Order</p>
                <button
                  className={`btn bg-white hover:bg-mySecondary border-1 btn-xs ${
                    order.isApproved
                      ? "text-success border-success"
                      : "text-myPrimary border-myPrimary"
                  }`}
                >
                  {order.isApproved ? "Completed" : "Under Review"}
                </button>
              </article>
              <article className="flex justify-around mb-3">
                <div>
                  <p className="text-xs">Total</p>
                  <p>
                    {(
                      Number(order.amount) - Number(order.estimateRevenue)
                    ).toFixed(4)}
                  </p>
                </div>
                <div>
                  <p className="text-xs">Order Number</p>
                  <p>{order.credential}</p>
                </div>
              </article>
              <article>
                <ul className="steps w-full mb-3">
                  <li data-content="" className="step step-warning"></li>
                  <li data-content="" className="step step-warning"></li>
                  <li data-content="" className="step step-warning"></li>
                </ul>
              </article>
              <article className="flex justify-around mb-3">
                <div>
                  <p className="text-xs">Estimate Reveneue</p>
                  <p>{order.estimateRevenue.toFixed(4)}</p>
                </div>
                <div>
                  <p className="text-xs">Time</p>
                  <p>{createdDate}</p>
                </div>
              </article>
            </figure>
          );
        })}
      </div>
      <AlertBox id="order-error" text={error} alertType="alert-error" />
    </section>
  );
};
export default FundHistory;
