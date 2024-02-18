import { useEffect, useState } from "react";
import { allApi } from "../../../router/axiosApi";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import Loading from "../../shared/Loading";
import moment from "moment";
import { toast } from "react-toastify";

const FundHistory = () => {
  const user = useRouteLoaderData("user");
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("")

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const filter = {} ;
        if (!user.isAdmin) { filter.client = user._id }
        if (category) { filter.category = category }
        const response = await allApi.post(
          `transactions?page=${page}&limit=10`, { filter }
        );
        if (response.data?.success) {
          const transactionWithOrder = response.data.payload.allTransaction;
          const transactionWithoutOrder = transactionWithOrder.filter(
            (transaction) =>
              transaction.category == "Recharge" ||
              transaction.category == "Withdraw"
          );

          setTransactions(transactionWithoutOrder);
          setPagination(response.data.payload.pagination);
        }
        setLoading(false);
      } catch (err) {
        setPagination({})
        setLoading(false);
        if (err.response.data.message) {
          toast.error(err.response.data.message); // error sent by server
        } else {
          toast.error(err.message); // other error
        }
      }
    };
    getTransactions();
  }, [user, page, category]);

  const handleClick = (userId) => {
    event.preventDefault();
    if (user.isAdmin) {
      navigate(`/client/${userId}`);
    }
  };

  const handleNavigation = (nav) => {
    event.preventDefault();
    setCategory(nav);
    setPage(1);
    setLoading(true);
  };

  // styles
  const navStyle = "py-3 px-2 rounded w-full";
  const activeNavStyle = "bg-primary text-white";

  return loading ? (
    <Loading />
  ) : (
    <section className="pb-20">
      <section className="sticky top-0 bg-myBg pb-3">
      <h1 className="font-semibold text-center pt-2 mb-5">Fund History</h1>
      {/* pagination */}
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
      {/* fund nav */}
      <div className="bg-mySecondary grid grid-cols-3 justify-between mt-3 text-center rounded">
        <span
          className={`${navStyle} ${category == "" && activeNavStyle}`}
          onClick={() => handleNavigation("")}
        >
          Total Fund
        </span>

        <span
          className={`${navStyle} ${category == "Recharge" && activeNavStyle}`}
          onClick={() => handleNavigation("Recharge")}
        >
          Recharge
        </span>
        <span
          className={`${navStyle} ${category == "Withdraw" && activeNavStyle}`}
          onClick={() => handleNavigation("Withdraw")}
        >
          Withdraw
        </span>
      </div>
      </section>
      {/* fund list */}
      <div className="bg-white rounded shadow">
        {!transactions.length ? (
          <p className="text-gray-400 text-center p-5 h-screen">
            No fund history
          </p>
        ) : (
          transactions.map((transaction) => {
            const createdDate = moment(transaction.createdAt).format(
              "DD/MM/YYYY HH:mm:ss"
            );
            return (
              <div
                key={transaction._id}
                className={`flex gap-2 items-center justify-between px-3 py-2 mb-2 text-sm bg-opacity-40 ${
                  transaction.isRejected
                    ? "bg-error"
                    : transaction.isApproved
                    ? "bg-success"
                    : "bg-gray-300"
                }`}
                onClick={() => handleClick(transaction.client.userId)}
              >
                <p>
                  {transaction.isRejected
                    ? "Rejected"
                    : transaction.isApproved
                    ? "Approved"
                    : "Pending"}
                </p>
                {user.isAdmin && (
                  <div className="overflow-x-scroll no-scrollbar text-start flex-grow">
                    <p>{transaction.client?.name}</p>
                    <p className="text-xs">{transaction.credential}</p>
                  </div>
                )}
                <div>
                  <p>{transaction.category}</p>
                  <p className="text-[0.60rem]">{createdDate}</p>
                </div>
                <p
                  className={
                    transaction.category == "Withdraw"
                      ? "text-error text-end"
                      : "text-success text-end"
                  }
                >
                  {!transaction.isApproved && transaction.category == "Recharge"
                    ? "__"
                    : transaction.amount.toFixed(2)}
                </p>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};
export default FundHistory;
