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

  // styles
  const navStyle = "w-full px-2";
  const activeNavStyle = "border-b-4 border-myPrimary";

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

  return loading ? (
    <Loading />
  ) : (
    <section className="pb-20">
      <h1 className="text-lg font-semibold text-center pt-2 mb-5">
        Fund History
      </h1>
      <div className="bg-mySecondary flex justify-between p-2 text-center mb-2">
        <span
          className={`${navStyle} ${
            transactions[0] == allTransactions[0] &&
            transactions.length == allTransactions.length &&
            activeNavStyle
          }`}
          onClick={() => setTransactions(allTransactions)}
        >
          Total Fund
        </span>

        <span
          className={`${navStyle} ${
            transactions[0] == rechargeTransactions[0] &&
            transactions.length == rechargeTransactions.length &&
            activeNavStyle
          }`}
          onClick={() => setTransactions(rechargeTransactions)}
        >
          Recharge
        </span>
        <span
          className={`${navStyle} ${
            transactions[0] == withdrawTransactions[0] &&
            transactions.length == withdrawTransactions.length &&
            activeNavStyle
          }`}
          onClick={() => setTransactions(withdrawTransactions)}
        >
          Withdraw
        </span>
      </div>
      <div>
        {transactions.map((transaction) => {
          const createdDate = moment(transaction.createdAt).format(
            "DD/MM/YYYY HH:mm:ss"
          );
          return (
            <div
              key={transaction._id}
              className={`grid gap-2 justify-between px-3 py-2 mb-2 text-sm bg-opacity-60 ${
                transaction.isApproved ? "bg-mySecondary" : "bg-myPrimary"
              } ${
                user.isAdmin ? "grid-cols-5" : "grid-cols-2"
              }`}
            >
              {user.isAdmin && (
                <div className={`flex gap-2 overflow-x-scroll no-scrollbar text-start ${
                  user.isAdmin ? "col-span-3" : ""
                }`}>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-xs checkbox-success"
                    checked={transaction.isApproved ? true : false}
                    readOnly
                    onClick={() => transaction.category == "Withdraw" && handleApprove(transaction._id)}
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
                {!transaction.isApproved && transaction.category == "Recharge" ? "Pending" : transaction.amount.toFixed(2)}
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
