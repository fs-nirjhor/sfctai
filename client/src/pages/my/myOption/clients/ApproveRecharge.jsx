import { useState } from "react";
import { transactionApi } from "../../../../router/axiosApi";
import { toast } from "react-toastify";

const ApproveRecharge = ({ id, pendingRecharge }) => {
  const [approveRechargeAmount, setApproveRechargeAmount] = useState("");

  const handleApproveRecharge = async (transactionId) => {
    event.preventDefault();
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
      const response = await transactionApi.put("add-recharge", { recharge });
      if (response.data?.success) {
        toast.success("Recharge successfully approved");
        setApproveRechargeAmount("");
        window.location.reload();
      }
    } catch (err) {
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
      toast.loading("Rejecting...", { toastId: "reject-recharge-loading" });
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
              className="btn btn-warning btn-sm bg-myPrimary text-white join-item w-1/6"
            >
              Approve
            </button>
            <button
              onClick={() => handleRejectRecharge(recharge._id)}
              className="btn btn-error text-white btn-sm join-item w-1/6"
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
