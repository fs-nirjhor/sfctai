import { useEffect, useState } from "react";
import { allApi } from "../../../router/axiosApi";
import { useLocation, useNavigate, useRouteLoaderData } from "react-router-dom";
import Loading from "../../shared/Loading";
import moment from "moment";
import { toast } from "react-toastify";
import Pagination from "./../../shared/Pagination";

const FundHistory = () => {
  const loggedUser = useRouteLoaderData("user");
  const { state } = useLocation();
  const user = state || loggedUser;

  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const filter = {};
        if (!user.isAdmin) {
          filter.client = user._id;
        }
        if (category) {
          filter.category = category;
        } else {
          filter.category = { $nin: ["Order", "Reduce"] };
        }
        const response = await allApi.post(
          `transactions?page=${page}&limit=10`,
          { filter }
        );
        if (response.data?.success) {
          setTransactions(response.data.payload.allTransaction);
          setPagination(response.data.payload.pagination);
        }
        setLoading(false);
      } catch (err) {
        setPagination({});
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
  const activeNavStyle = "bg-myPrimary text-white";

  return (
    <section className="pb-20 px-2">
      <section className="sticky top-0 bg-myBg pb-3">
        <h1 className="font-semibold text-center pt-2 mb-5">
          {state && state.name + "'s"} Fund History
        </h1>
        {/* pagination */}
        <Pagination page={page} setPage={setPage} pagination={pagination} />
        {/* fund nav */}
        <div className="bg-mySecondary grid grid-cols-3 justify-between mt-3 text-center rounded">
          <span
            className={`${navStyle} ${category == "" && activeNavStyle}`}
            onClick={() => handleNavigation("")}
          >
            Total Fund
          </span>

          <span
            className={`${navStyle} ${
              category == "Recharge" && activeNavStyle
            }`}
            onClick={() => handleNavigation("Recharge")}
          >
            Recharge
          </span>
          <span
            className={`${navStyle} ${
              category == "Withdraw" && activeNavStyle
            }`}
            onClick={() => handleNavigation("Withdraw")}
          >
            Withdraw
          </span>
        </div>
      </section>
      {/* fund list */}
      <div className="bg-white rounded shadow">
        {loading ? (
          <Loading />
        ) : !transactions.length ? (
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
                className="flex gap-2 items-center justify-between px-3 py-2 mb-1 text-sm bg-gray-300"
                onClick={() => handleClick(transaction.client._id)}
              >
                {/* condition */}
                <p>
                  {transaction.category == "Reduce" ||
                  transaction.category == "Bonus"
                    ? ""
                    : transaction.isRejected
                    ? "Rejected"
                    : transaction.isApproved
                    ? "Approved"
                    : "Pending"}
                </p>
                {/* admin view */}
                {user.isAdmin && (
                  <div className="overflow-x-scroll no-scrollbar text-start ">
                    <p>{transaction.client?.name}</p>
                    <p className="text-xs">{transaction.credential}</p>
                  </div>
                )}
                {/* category and time */}
                <div>
                  <p>{transaction.category}</p>
                  <p className="text-[0.60rem]">{createdDate}</p>
                  {transaction.category == "Withdrawal Refused" && (
                    <p className="text-xs text-red-500">
                      Please contact customer service
                    </p>
                  )}
                </div>
                {/* amount */}
                <p
                  className={
                    transaction.category == "Withdraw" ||
                    transaction.category == "Reduce"
                      ? "text-error text-end before:content-['-']"
                      : "text-success text-end before:content-['+']"
                  }
                >
                  {!transaction.isApproved && transaction.category == "Recharge"
                    ? ""
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
