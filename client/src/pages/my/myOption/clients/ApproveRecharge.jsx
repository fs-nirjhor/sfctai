import { useEffect, useState } from "react";
import { transactionApi } from "../../../../router/axiosApi";
import { toast } from 'react-toastify';

const ApproveRecharge = ({id}) => {
  const [pendingRecharge, setPendingRecharge] = useState([]);
  const [approveRechargeAmount, setApproveRechargeAmount] = useState("");

  useEffect(() => {
    const getPendingRecharge = async () => {
      try {
        // get pending recharges
        const filter = {
          client: id,
          isApproved: false,
          category: "Recharge",
        };
        toast.loading("Loading...", {toastId: "pending-recharge-loading"});
        const pendingRechargeData = await transactionApi.post("", { filter });
        toast.dismiss("pending-recharge-loading");
        if (pendingRechargeData.data?.success) {
          setPendingRecharge(pendingRechargeData.data.payload.allTransaction);
        }
      } catch (err) {
        toast.dismiss("pending-recharge-loading");
        if (err.response.data.message) {
          toast.error(err.response.data.message); // error sent by server
        } else {
          toast.error(err.message); // other error
        }
      }
    };
    getPendingRecharge();
  }, [id]);

  const handleApproveRecharge = async (transactionId) => {
    event.preventDefault();
    try {
      // recharge data
      const recharge = {
        client: id,
        amount: approveRechargeAmount,
        transactionId,
      };
      const response = await transactionApi.put("add-recharge", { recharge });
      if (response.data?.success) {
        toast.success("Recharge successfully approved")
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

  return (
       <div >
              <h3 className="mb-3 font-semibold">Pending Recharges:</h3>
              {!pendingRecharge.length && (
                <p className="text-center my-2">No recharge pending</p>
              )}
              {pendingRecharge.map((recharge) => (
                <div key={recharge._id} className="mb-3">
                  <p className="text-sm">
                    Transaction ID: {recharge.credential}
                  </p>
                  <form
                    className="join w-full"
                    onSubmit={() => handleApproveRecharge(recharge._id)}
                  >
                    <input
                      type="number"
                      placeholder="Enter amount"
                      className="input input-sm input-bordered border-myPrimary join-item w-4/6"
                      onChange={(e) => setApproveRechargeAmount(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className="btn btn-warning btn-sm bg-myPrimary text-white join-item w-2/6"
                    >
                      Approve
                    </button>
                  </form>
                </div>
              ))}
            </div>
  )
}
export default ApproveRecharge