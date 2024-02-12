import { useEffect, useState } from "react";
import { transactionApi } from "../../../router/axiosApi";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import AlertBox from "./../../shared/AlertBox";
import Loading from "../../shared/Loading";
import moment from "moment";

const FundHistory = () => {
  const user = useRouteLoaderData("user");
  const navigate = useNavigate();
  const [allTransactions, setAllTransactions] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [activeNav, setActiveNav] = useState("all");
  const [error, setError] = useState("");
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
          setError(err.response.data.message); // error sent by server
        } else {
          setError(err.message); // other error
        }
        document.getElementById("fund-error").showModal();
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

  const handleApprove = async (transactionId) => {
    event.preventDefault();
    try {
      const response = await transactionApi.put(`approve/${transactionId}`);
      if (response.data?.success) {
        document.getElementById("approve-success").showModal();
      }
      window.location.reload();
    } catch (err) {
      if (err.response.data.message) {
        setError(err.response.data.message); // error sent by server
      } else {
        setError(err.message); // other error
      }
      document.getElementById("client-error").showModal();
    }
  };

  const handleNavigation = (data, nav) => {
    setTransactions(data);
    setActiveNav(nav)
  }

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
          className={`${navStyle} ${activeNav == "all" &&
            activeNavStyle
          }`}
          onClick={() => handleNavigation(allTransactions, "all")}
        >
          Total Fund
        </span>

        <span
          className={`${navStyle} ${activeNav == "recharge" &&
            activeNavStyle
          }`}
          onClick={() => handleNavigation(rechargeTransactions, "recharge")}
        >
          Recharge
        </span>
        <span
          className={`${navStyle} ${activeNav == "withdraw" &&
            activeNavStyle
          }`}
          onClick={() => handleNavigation(withdrawTransactions, "withdraw")}
        >
          Withdraw
        </span>
      </div>
      {/* fund list */}
      <div className="bg-white rounded shadow">
        {!transactions.length ? <p className="text-gray-400 text-center p-5 h-screen">No fund history</p> : transactions.map((transaction) => {
          const createdDate = moment(transaction.createdAt).format(
            "DD/MM/YYYY HH:mm:ss"
          );
          return (
            <div
              key={transaction._id}
              className={`grid gap-2 justify-between px-3 py-2 mb-2 text-sm bg-opacity-60 ${
                transaction.isApproved ? "bg-mySecondary" : "bg-myPrimary"
              } ${user.isAdmin ? "grid-cols-5" : "grid-cols-2"}`}
            >
              {user.isAdmin && (
                <div
                  className={`flex gap-2 overflow-x-scroll no-scrollbar text-start ${
                    user.isAdmin ? "col-span-3" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    className="checkbox checkbox-xs checkbox-success"
                    checked={transaction.isApproved ? true : false}
                    readOnly
                    onClick={() =>
                      transaction.category == "Withdraw" &&
                      handleApprove(transaction._id)
                    }
                  />
                  <div onClick={() => handleClick(transaction.client.userId)}>
                    <p>{transaction.client?.name}</p>
                    <p className="text-xs">{transaction.credential}</p>
                  </div>
                </div>
              )}
              <div onClick={() => handleClick(transaction.client?.userId)}>
                <p>{transaction.category}</p>
                <p className="text-[0.60rem]">{createdDate}</p>
              </div>
              <p
                className={
                  transaction.category == "Withdraw"
                    ? "text-error text-end"
                    : "text-success text-end"
                }
                onClick={() => handleClick(transaction.client?.userId)}
              >
                {!transaction.isApproved && transaction.category == "Recharge"
                  ? "Pending"
                  : transaction.amount.toFixed(2)}
              </p>
            </div>
          );
        })}
      </div>
      <AlertBox id="fund-error" text={error} alertType="alert-error" />
      <AlertBox
        id="approve-success"
        text="Approved Successfully"
        alertType="alert-success"
      />
    </section>
  );
};
export default FundHistory;
