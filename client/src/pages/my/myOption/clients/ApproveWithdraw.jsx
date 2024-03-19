import { transactionApi } from "../../../../router/axiosApi";
import { toast } from "react-toastify";
import moment from "moment";
import { useState } from "react";

const ApproveWithdraw = ({ id, pendingWithdraw }) => {
  const [processing, setProcessing] = useState(false);
  const handleApproveWithdraw = async (transactionId) => {
    event.preventDefault();
    try {
      const updates = {
        client: id,
        isApproved: true,
      };
      toast.loading("Approving...", { toastId: "approve-withdraw-loading" });
      setProcessing(true);
      const response = await transactionApi.put(`approve/${transactionId}`, {
        updates,
      });
      toast.dismiss("approve-withdraw-loading");
      if (response.data?.success) {
        toast.success("Withdraw successfully approved");
        window.location.reload();
      }
    } catch (err) {
      toast.dismiss("approve-withdraw-loading");
      if (err.response.data.message) {
        toast.error(err.response.data.message); // error sent by server
      } else {
        toast.error(err.message); // other error
      }
    }
  };

  const handleRejectWithdraw = async (transactionId) => {
    event.preventDefault();
    try {
      toast.loading("Rejecting...", { toastId: "reject-withdraw-loading" });
      setProcessing(true);
      const response = await transactionApi.put(`reject/${transactionId}`);
      toast.dismiss("reject-withdraw-loading");
      if (response.data?.success) {
        toast.success("Withdraw successfully rejected");
        window.location.reload();
      }
    } catch (err) {
      toast.dismiss("reject-withdraw-loading");
      if (err.response.data.message) {
        toast.error(err.response.data.message); // error sent by server
      } else {
        toast.error(err.message); // other error
      }
    }
  };
  return (
    <div>
      <h3 className="mb-3 font-semibold">Pending Withdraws:</h3>
      {!pendingWithdraw.length && (
        <p className="text-center my-2">No withdraw pending</p>
      )}
      {pendingWithdraw.map((withdraw) => {
        const createdDate = moment(withdraw.createdAt).format(
          "DD/MM/YYYY HH:mm:ss"
        );
        const photo = withdraw.photo; //`${serverUrl}/${withdraw.photo}`
        return (
          <section
            key={withdraw._id}
            className="mb-3 p-2 bg-white rounded flex items-center gap-3"
          >
            <img src={photo} alt={withdraw._id} className="w-20" />
            <div>
              <p className="text-sm">Transaction ID: {withdraw.credential}</p>
              <p className="text-sm">Amount: ${withdraw.amount.toFixed(2)}</p>
              <p className="text-sm">Time: {createdDate}</p>
              <div className="flex gap-3 mt-3">
                <button
                  className={`btn btn-warning btn-sm bg-myPrimary text-white ${
                    processing && "btn-disabled"
                  }`}
                  onClick={() => handleApproveWithdraw(withdraw._id)}
                >
                  Approve
                </button>
                <button
                  className={`btn btn-warning btn-sm bg-myPrimary text-white ${
                    processing && "btn-disabled"
                  }`}
                  onClick={() => handleRejectWithdraw(withdraw._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};
export default ApproveWithdraw;
