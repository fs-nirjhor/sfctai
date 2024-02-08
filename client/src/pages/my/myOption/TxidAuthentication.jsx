import { useState } from "react";
import { Link, useNavigate, useRouteLoaderData } from "react-router-dom";
import AlertBox from "./../../shared/AlertBox";
import { transactionApi } from "../../../router/axiosApi";

const TxidAuthentication = () => {
  const user = useRouteLoaderData("user");
  const [amount, setAmount] = useState("");
  const [txid, setTxid] = useState("");
  const [error, setError] = useState("An error occurred");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    event.preventDefault();
    // transaction data
    const transaction = {
      client: user._id,
      amount: amount,
      credential: txid,
      category: "Recharge",
    };
    try {
      const res = await transactionApi.post("recharge-request", {
        transaction,
      });
      if (res.data?.success) {
        document.getElementById("txid-success").showModal();
        window.location.reload();
        navigate(-1);
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError(err.message);
      }
      document.getElementById("txid-error").showModal();
    }
  };

  return (
    <section>
      <h1 className="text-lg font-semibold text-center pt-2 mb-5">
        TXID Authentication
      </h1>
      <form onSubmit={handleSubmit}>
        <label className="form-control w-full max-w-md mx-auto">
          <input
            type="number"
            placeholder="Enter your recharge amount"
            name="txid"
            className="input bg-mySecondary w-full max-w-md text-center mb-3"
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter your TXID"
            name="txid"
            className="input bg-mySecondary w-full max-w-md text-center"
            onChange={(e) => setTxid(e.target.value)}
            required
          />
          <div className="label">
            <Link to="/my/wallet/recharge">About recharge</Link>
          </div>
        </label>
        <label className="form-control w-full max-w-md mx-auto">
          <button
            type="submit"
            className="btn btn-warning bg-myPrimary text-white font-semibold w-full mt-5"
          >
            Submit
          </button>
        </label>
      </form>
      <AlertBox id="txid-error" text={error} alertType="alert-error" />
    </section>
  );
};
export default TxidAuthentication;
