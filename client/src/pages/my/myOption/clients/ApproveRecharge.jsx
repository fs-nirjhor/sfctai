import { useEffect, useState } from "react";
import { transactionApi } from "../../../../router/axiosApi";
import { toast } from 'react-toastify';

const ApproveRecharge = ({client}) => {
  const [pendingRecharge, setPendingRecharge] = useState([]);
  const [approveRechargeAmount, setApproveRechargeAmount] = useState("");

  useEffect(() => {
    const getPendingRecharge = async () => {
      try {
        // get pending recharges
        const filter = {
          client: client._id,
          isApproved: false,
          category: "Recharge",
        };
        const pendingRechargeData = await transactionApi.post("", { filter });
        if (pendingRechargeData.data?.success) {
          setPendingRecharge(pendingRechargeData.data.payload.allTransaction);
          setLoading(false);
        }
      } catch (err) {
        if (err.response.data.message) {
          toast.error(err.response.data.message); // error sent by server
        } else {
          toast.error(err.message); // other error
        }
        document.getElementById("client-error").showModal();
      }
    };
    getPendingRecharge();
  }, [client._id]);

  const handleApproveRecharge = async (transactionId) => {
    event.preventDefault();
    try {
      // recharge data
      const recharge = {
        client: client._id,
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
       < >
              <h3 className="mb-3">Pending Recharges</h3>
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
                      value={approveRechargeAmount}
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
            </>
  )
}
export default ApproveRecharge