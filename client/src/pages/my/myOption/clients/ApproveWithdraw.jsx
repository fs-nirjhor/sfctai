import { useEffect, useState } from "react";
import { transactionApi } from "../../../../router/axiosApi";
import { toast } from 'react-toastify';
import moment from "moment";

const ApproveWithdraw = ({id}) => {
  const [pendingWithdraw, setPendingWithdraw] = useState([]);

  useEffect(() => {
    const getPendingWithdraw = async () => {
      try {
        // get pending withdraws
        const filter = {
          client: id,
          isApproved: false,
          isRejected: false,
          category: "Withdraw",
        };
        toast.loading("Loading...", {toastId: "pending-withdraw-loading"});
        const pendingWithdrawData = await transactionApi.post("", { filter });
        toast.dismiss("pending-withdraw-loading");
        if (pendingWithdrawData.data?.success) {
          setPendingWithdraw(pendingWithdrawData.data.payload.allTransaction);
        }
      } catch (err) {
        toast.dismiss("pending-withdraw-loading");
        if (err.response.data.message) {
          toast.error(err.response.data.message); // error sent by server
        } else {
          toast.error(err.message); // other error
        }
      }
    };
    getPendingWithdraw();
  }, [id]);

  const handleApproveWithdraw = async (transactionId) => {
    event.preventDefault();
    try {
      const updates = {
        client: id,
        isApproved: true,
      };
      toast.loading("Approving...", {toastId: "approve-withdraw-loading"});
      const response = await transactionApi.put(`approve/${transactionId}`, {updates});
      toast.dismiss("approve-withdraw-loading")
      if (response.data?.success) {
        toast.success("Withdraw successfully approved")
        window.location.reload();
      }
    } catch (err) {
      toast.dismiss("approve-withdraw-loading")
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
      toast.loading("Rejecting...", {toastId: "reject-withdraw-loading"});
      const response = await transactionApi.put(`reject/${transactionId}`);
      toast.dismiss("reject-withdraw-loading")
      if (response.data?.success) {
        toast.success("Withdraw successfully rejected")
        window.location.reload();
      }
    } catch (err) {
      toast.dismiss("reject-withdraw-loading")
      if (err.response.data.message) {
        toast.error(err.response.data.message); // error sent by server
      } else {
        toast.error(err.message); // other error
      }
    }
  };

  return (
       <div >
              <h3 className="mb-3 font-semibold">Pending Withdraws:</h3>
              {!pendingWithdraw.length && (
                <p className="text-center my-2">No withdraw pending</p>
              )}
              {pendingWithdraw.map((withdraw) => {
                const createdDate = moment(withdraw.createdAt).format(
                  "DD/MM/YYYY HH:mm:ss"
                );
                return (
                <div key={withdraw._id} className="mb-3 p-2 bg-white rounded">
                  <p className="text-sm">
                    Transaction ID: {withdraw.credential}
                  </p>
                  <p className="text-sm">
                    Amount: ${withdraw.amount.toFixed(2)}
                  </p>
                  <p className="text-sm">
                    Time: {createdDate}
                  </p>
                  <div className="flex gap-5 mt-3 px-5">
                    <button
                      className="btn btn-warning btn-sm bg-myPrimary text-white" onClick={() => handleApproveWithdraw(withdraw._id)}
                      >
                      Approve
                    </button>
                    <button
                      className="btn btn-warning btn-sm bg-myPrimary text-white" onClick={() => handleRejectWithdraw(withdraw._id)}
                      >
                      Reject
                    </button>
                      </div>
                </div>
              )})}
            </div>
  )
}
export default ApproveWithdraw