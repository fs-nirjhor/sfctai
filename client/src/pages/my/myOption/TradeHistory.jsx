import { useEffect, useState } from "react";
import { allApi } from "../../../router/axiosApi";
import { useRouteLoaderData } from "react-router-dom";
import Loading from "../../shared/Loading";
import moment from "moment";
import TradingViewWidget from "../../shared/TradingViewWidget";
import { toast } from "react-toastify";

const TradeHistory = () => {
  const user = useRouteLoaderData("user");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getTrades = async () => {
      try {
        const filter = user.isAdmin
          ? { category: "Order" }
          : { client: user._id, category: "Order" };
        const response = await allApi.post(
          `transactions?page=${page}&limit=5`, { filter }
        );
        if (response.data?.success) {
          setOrders(response.data.payload.allTransaction);
          setPagination(response.data.payload.pagination);
        }
        setLoading(false);
      } catch (err) {
        setOrders([])
        setPagination({})
        setLoading(false);
        if (err.response.data.message) {
          toast.error(err.response.data.message); // error sent by server
        } else {
          toast.error(err.message); // other error
        }
      }
    };
    getTrades();
  }, [user, page]);

  return loading ? (
    <Loading />
  ) : (
    <section className="pb-20">
      <section className="sticky top-0 bg-myBg pb-3">
      <h1 className="font-semibold text-center pt-2 mb-5">Trade History</h1>
        <div className="flex justify-between items-center">
          <button
            className={`btn btn-sm ${!pagination.previous && "btn-disabled"}`}
            onClick={() => pagination.previous && setPage(pagination.previous)}
          >
            Previous
          </button>
          <div className="font-medium join bg-white w-40">
            <input
              type="number"
              className="input input-sm input-bordered w-1/2 join-item"
              value={page}
              onChange={(e) => setPage(e.target.value)}
              required
            />
            <span className="join-item input input-sm border-s-2 border-s-primary">{pagination.totalPage || 0}</span>
          </div>
          <button
            className={`btn btn-sm ${!pagination.next && "btn-disabled"}`}
            onClick={() => pagination.next && setPage(pagination.next)}
          >
            Next
          </button>
        </div>
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
                  <p>{order.coin} Currency Trade</p>
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
                    <p className="text-xs">Trade Number</p>
                    <p>{order.credential}</p>
                  </div>
                </div>
                <div className="h-20 overflow-hidden rounded mb-3">
                <TradingViewWidget coin={order.coin}/>
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
export default TradeHistory;
