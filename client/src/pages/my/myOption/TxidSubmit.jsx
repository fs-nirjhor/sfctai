import { useState } from "react";
import { Link, useNavigate, useRouteLoaderData } from "react-router-dom";
import { transactionApi } from "../../../router/axiosApi";
import { toast } from "react-toastify";

const TxidSubmit = () => {
  const user = useRouteLoaderData("user");
  const [amount, setAmount] = useState(0);
  const [txid, setTxid] = useState("");
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
        toast.success("Your TXID submitted successfully")
        window.location.reload();
        navigate(-1);
      }
    } catch (err) {
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error(err.message);
      }
    }
  };

  return (
    <section>
      <h1 className="font-semibold text-center pt-2 mb-5">TXID Submit</h1>
      <form onSubmit={handleSubmit}>
        <label className="form-control w-full max-w-md mx-auto">
          <input
            type="text"
            placeholder="Enter your TXID"
            name="txid"
            className="input bg-mySecondary w-full max-w-md text-center"
            onChange={(e) => setTxid(e.target.value)}
            required
          />
          <div className="label">
            <Link to="/my/wallet/recharge" className="text-white">
              About recharge
            </Link>
          </div>
        </label>
        <label className="form-control w-full max-w-md mx-auto">
          <button
            type="submit"
            className="btn btn-primary font-semibold w-full mt-5"
          >
            Submit
          </button>
        </label>
      </form>
    </section>
  );
};
export default TxidSubmit;
