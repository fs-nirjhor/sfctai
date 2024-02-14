import { useEffect, useState } from "react";
import { transactionApi } from "../../../router/axiosApi";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import Loading from "../../shared/Loading";
import moment from "moment";
import { toast } from "react-toastify";

const FundHistory = () => {
  const user = useRouteLoaderData("user");
  const navigate = useNavigate();
  const [allTransactions, setAllTransactions] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [activeNav, setActiveNav] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const filter = user.isAdmin ? {} : { client: user._id };
        const response = await transactionApi.post("/", { filter });
        if (response.data?.success) {
          const transactionWithOrder = response.data.payload.allTransaction;
          const transactionWithoutOrder = transactionWithOrder.filter(
            (transaction) =>
              transaction.category == "Recharge" ||
              transaction.category == "Withdraw"
          );

          setAllTransactions(transactionWithoutOrder);
          setTransactions(transactionWithoutOrder);
          setLoading(false);
        }
      } catch (err) {
        if (err.response.data.message) {
          toast.error(err.response.data.message); // error sent by server
        } else {
          toast.error(err.message); // other error
        }
      }
    };
    getTransactions();
  }, [user]);

  // funds filter

  const rechargeTransactions = allTransactions.filter(
    (transaction) => transaction.category == "Recharge"
  );
  const withdrawTransactions = allTransactions.filter(
    (transaction) => transaction.category == "Withdraw"
  );

  const handleClick = (userId) => {
    if (user.isAdmin) {
      navigate(`/client/${userId}`);
    }
  };

  const handleNavigation = (data, nav) => {
    setTransactions(data);
    setActiveNav(nav);
  };

  // styles
  const navStyle = "py-3 px-2 rounded w-full";
  const activeNavStyle = "bg-primary text-white";

  return loading ? (
    <Loading />
  ) : (
    <section className="pb-20">
      <h1 className="font-semibold text-center pt-2 mb-5">Fund History</h1>
      {/* fund nav */}
      <div className="bg-mySecondary grid grid-cols-3 justify-between mb-3 text-center rounded">
        <span
          className={`${navStyle} ${activeNav == "all" && activeNavStyle}`}
          onClick={() => handleNavigation(allTransactions, "all")}
        >
          Total Fund
        </span>

        <span
          className={`${navStyle} ${activeNav == "recharge" && activeNavStyle}`}
          onClick={() => handleNavigation(rechargeTransactions, "recharge")}
        >
          Recharge
        </span>
        <span
          className={`${navStyle} ${activeNav == "withdraw" && activeNavStyle}`}
          onClick={() => handleNavigation(withdrawTransactions, "withdraw")}
        >
          Withdraw
        </span>
      </div>
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
