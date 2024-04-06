import { useState } from "react";
import { transactionApi } from "../../../../router/axiosApi";
import { toast } from "react-toastify";
import Spinner from "../../../shared/Spinner";

const ApproveRecharge = ({ id, pendingRecharge }) => {
  const [approveRechargeAmount, setApproveRechargeAmount] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleApproveRecharge = async (transactionId) => {
    event.preventDefault();
    if (processing) {
      return toast.error("Try again later");
    }
    if (!approveRechargeAmount) {
      return toast.error("Please enter recharge amount");
    }
    try {
      // recharge data
      const recharge = {
        client: id,
        amount: approveRechargeAmount,
        transactionId,
      };
      setProcessing(true);
      const response = await transactionApi.put("approve-recharge", {
        recharge,
      });
      if (response.data?.success) {
        toast.success("Recharge successfully approved");
        setApproveRechargeAmount("");
        setProcessing(false);
        window.location.reload();
      }
    } catch (err) {
      setProcessing(false);
      if (err.response.data.message) {
        toast.error(err.response.data.message); // error sent by server
      } else {
        toast.error(err.message); // other error
      }
    }
  };
  const handleRejectRecharge = async (transactionId) => {
    event.preventDefault();
    try {
      toast.loading(<Spinner text="Rejecting..." />, {
        toastId: "reject-recharge-loading",
      });
      setProcessing(true);
      const response = await transactionApi.put(`reject/${transactionId}`);
      toast.dismiss("reject-recharge-loading");
      if (response.data?.success) {
        toast.success("Recharge successfully rejected");
        window.location.reload();
      }
    } catch (err) {
      toast.dismiss("reject-recharge-loading");
      if (err.response.data.message) {
        toast.error(err.response.data.message); // error sent by server
      } else {
        toast.error(err.message); // other error
      }
    }
  };

  return (
    <div>
      <h3 className="mb-3 font-semibold">Pending Recharges:</h3>
      {!pendingRecharge.length && (
        <p className="text-center my-2">No recharge pending</p>
      )}
      {pendingRecharge.map((recharge) => (
        <div key={recharge._id} className="mb-3">
          <p className="text-sm">Transaction ID: {recharge.credential}</p>
          <form className="join w-full">
            <input
              type="number"
              placeholder="Enter amount"
              className="input input-sm input-bordered border-myPrimary join-item w-4/6"
              onChange={(e) => setApproveRechargeAmount(e.target.value)}
              required
            />
            <button
              onClick={() => handleApproveRecharge(recharge._id)}
              className={`btn btn-warning btn-sm bg-myPrimary text-white join-item w-1/6 ${
                processing && "btn-disabled"
              }`}
            >
              Approve
            </button>
            <button
              onClick={() => handleRejectRecharge(recharge._id)}
              className={`btn btn-error text-white btn-sm join-item w-1/6 ${
                processing && "btn-disabled"
              }`}
            >
              Reject
            </button>
          </form>
        </div>
      ))}
    </div>
  );
};
export default ApproveRecharge;
