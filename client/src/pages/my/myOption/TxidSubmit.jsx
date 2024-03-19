import { useState } from "react";
import { Link, useNavigate, useRouteLoaderData } from "react-router-dom";
import { transactionApi } from "../../../router/axiosApi";
import { toast } from "react-toastify";

const TxidSubmit = () => {
  const user = useRouteLoaderData("user");
  const [txid, setTxid] = useState("");
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async () => {
    event.preventDefault();
    if (txid.length !== 12) {
      return toast.error("Invalid TXID");
    }
    // transaction data
    const transaction = {
      client: user._id,
      amount: 0,
      credential: txid,
      category: "Recharge",
    };
    try {
      setProcessing(true);
      const res = await transactionApi.post("recharge-request", {
        transaction,
      });
      if (res.data?.success) {
        toast.success("TXID submitted");
        // window.location.reload();
        navigate("/my");
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
            type="number"
            placeholder="Enter your TXID"
            name="txid"
            className="input bg-mySecondary w-full max-w-md text-center"
            onChange={(e) => setTxid(e.target.value)}
            required
          />
          <div className="label">
            <Link to="/my/recharge" className="text-white">
              About recharge
            </Link>
          </div>
        </label>
        <label className="form-control w-full max-w-md mx-auto">
          <button
            type="submit"
            className={`btn btn-primary font-semibold w-full mt-5 ${
              processing && "btn-disabled"
            }`}
          >
            Submit
          </button>
        </label>
      </form>
    </section>
  );
};
export default TxidSubmit;
