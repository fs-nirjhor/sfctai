import { useEffect, useState } from "react";
import { allApi } from "../../../router/axiosApi";
import { useLocation, useRouteLoaderData } from "react-router-dom";
import Loading from "../../shared/Loading";
import moment from "moment";
import TradingViewWidget from "../../shared/TradingViewWidget";
import { toast } from "react-toastify";
import Pagination from "../../shared/Pagination";

const OrderHistory = () => {
  const loggedUser = useRouteLoaderData("user");
  const { state } = useLocation();
  const user = state || loggedUser;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const filter = user.isAdmin
          ? { category: "Order" }
          : { client: user._id, category: "Order" };
        const response = await allApi.post(
          `transactions?page=${page}&limit=5`,
          { filter }
        );
        if (response.data?.success) {
          setOrders(response.data.payload.allTransaction);
          setPagination(response.data.payload.pagination);
        }
        setLoading(false);
      } catch (err) {
        setOrders([]);
        setPagination({});
        setLoading(false);
        if (err.response.data.message) {
          toast.error(err.response.data.message); // error sent by server
        } else {
          toast.error(err.message); // other error
        }
      }
    };
    getOrders();
  }, [user, page]);

  return loading ? (
    <Loading />
  ) : (
    <section className="pb-20 px-2">
      <section className="sticky top-0 bg-myBg pb-3">
        <h1 className="font-semibold text-center pt-2 mb-5">
          {state && state.name + "'s"} Order History
        </h1>
        <Pagination page={page} setPage={setPage} pagination={pagination} />
      </section>
      <div>
        {orders.map((order) => {
          const createdDate = moment(order.createdAt).format(
            "DD/MM/YYYY HH:mm:ss"
          );
          const image = `https://assets.coincap.io/assets/icons/${order.coin?.toLowerCase()}@2x.png`;
          return (
            <figure
              key={order._id}
              className="bg-white p-2 mb-2 rounded text-center"
            >
              <div className="flex justify-between mb-3">
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
              </div>
              <div className="flex justify-around mb-3">
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
              </div>
              <div className="h-20 overflow-hidden rounded mb-3">
                <TradingViewWidget coin={order.coin} />
              </div>
              <div className="flex justify-around mb-3">
                <div>
                  <p className="text-xs">Estimate Reveneue</p>
                  <p>{order.estimateRevenue.toFixed(4)}</p>
                </div>
                <div>
                  <p className="text-xs">Time</p>
                  <p>{createdDate}</p>
                </div>
              </div>
            </figure>
          );
        })}
      </div>
    </section>
  );
};
export default OrderHistory;
