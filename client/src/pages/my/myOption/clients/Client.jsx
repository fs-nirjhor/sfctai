/* eslint-disable no-undef */
import { Link, useParams } from "react-router-dom";
import Loading from "../../../shared/Loading";
import { useEffect, useState } from "react";
import { transactionApi, userApi } from "../../../../router/axiosApi";
import AlertBox from "../../../shared/AlertBox";
import DeleteConfirm from "./../set/DeleteConfirm";

const Client = () => {
  const { userId } = useParams();
  const [client, setClient] = useState({});
  const [pendingRecharge, setPendingRecharge] = useState([]);
  const [approveRechargeAmount, setApproveRechargeAmount] = useState("");
  const [bonusAmount, setBonusAmount] = useState("");
  const [trc20Address, setTrc20Address] = useState("");
  const [phone, setPhone] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [withdrawalPassword, setWithdrawalPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getClient = async () => {
      try {
        // get client
        const userData = await userApi.get(userId);
        if (userData.data?.success) {
          setClient(userData.data.payload.user);
          setLoading(false);
        }
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
          setError(err.response.data.message); // error sent by server
        } else {
          setError(err.message); // other error
        }
        document.getElementById("client-error").showModal();
      }
    };
    getClient();
  }, [userId, client._id]);
  
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
        document.getElementById("recharge-success").showModal();
        setApproveRechargeAmount("");
        window.location.reload();
      }
    } catch (err) {
      if (err.response.data.message) {
        setError(err.response.data.message); // error sent by server
      } else {
        setError(err.message); // other error
      }
      document.getElementById("client-error").showModal();
    }
  };

  const handleUpdate = async (update) => {
    event.preventDefault();
    try {
      const res = await userApi.put(client._id, update);
      if (res.data?.success) {
        document.getElementById("update-success").showModal();
        window.location.reload();
      }
    } catch (err) {
      if (err.response?.data.message) {
        setError(err.response.data.message); // error sent by server
      } else {
        setError(err.message); // other error
      }
      document.getElementById("bind-error").showModal();
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    document.getElementById("delete_dialog").showModal();
  };

  const handleBonusAmount = async () => {
    event.preventDefault();
    try {
      // bonus data
      const transaction = {
        client: client._id,
        amount: bonusAmount,
        credential: `bonus-${userId}`,
        category: "Recharge",
        isApproved: true,
      };
      const res = await transactionApi.post("recharge-request", {
        transaction,
      });
      // recharge data
      const recharge = { client: client._id, amount: bonusAmount };
      const response = await transactionApi.put("add-recharge", { recharge });
      if (res.data?.success && response.data?.success) {
        document.getElementById("recharge-success").showModal();
        setBonusAmount("");
        window.location.reload();
      }
    } catch (err) {
      if (err.response?.data.message) {
        setError(err.response.data.message); // error sent by server
      } else {
        setError(err.message); // other error
      }
      document.getElementById("client-error").showModal();
    }
  };
  const doubleBoxStyle = "grid grid-cols-2 p-2";
  const singleBoxStyle = "p-2";
  return loading ? (
    <Loading />
  ) : (
    <div className="pb-20">
      <h1 className="font-semibold text-center pt-2 mb-5">{client.name}</h1>
      <section>
        <figure className="avatar w-full">
          <div
            className={`w-24 h-24 mx-auto rounded-full ring ${
              client.transaction?.balance >= 10 || client.transaction?.isOrderPending 
                ? "ring-myPrimary"
                : "ring-mySecondary"
            }`}
          >
            <img src={client.avatar} alt="avatar" />
          </div>
        </figure>
        {/* message and delete */}
        <div className="flex justify-between">
          <button
            className="btn btn-error btn-sm text-white"
            onClick={handleDelete}
          >
            Delete
          </button>
          <Link
            to={`/my/chat/${client._id}`}
            className="btn btn-warning btn-sm text-white"
          >
            Message
          </Link>
        </div>
        <section className="bg-mySecondary w-full mt-10 p-2 rounded">
          {/* header */}
          <div className={doubleBoxStyle}>
            <span>About</span>
            <span>Transaction</span>
          </div>
          {/* name - balance */}
          <div className={doubleBoxStyle}>
            <div className="overflow-x-auto">Name: {client.name}</div>
            <div>Balance: {client.transaction.balance.toFixed(2)}</div>
          </div>
          {/* phone - income */}
          <div className={doubleBoxStyle}>
            <div>Phone: {client.phone}</div>
            <div>Income: {client.transaction.totalIncome.toFixed(2)}</div>
          </div>
          {/* userid - recharge */}
          <div className={doubleBoxStyle}>
            <div>UserId: {client.userId}</div>
            <div>Recharge: {client.transaction.totalRecharge.toFixed(2)}</div>
          </div>
          {/* BINDING - WITHDRAW */}
          <div className={doubleBoxStyle}>
            <div className="overflow-x-auto">
              Binding Id: {client.trc20Address}
            </div>
            <div>Withdraw: {client.transaction.totalWithdraw.toFixed(2)}</div>
          </div>
          {/* Team Status */}
          <div className={singleBoxStyle}>
          <Link
            to="team"
            className="btn btn-warning btn-sm text-white w-full"
            state={client}
          >
            Team
          </Link>
          </div>
          {/* change phone */}
          <div>
            <div className={singleBoxStyle}>
              <form
                className="join w-full"
                onSubmit={() => handleUpdate({ phone })}
              >
                <input
                  type="number"
                  placeholder="Phone Number"
                  className="input input-sm input-bordered border-myPrimary join-item w-4/6"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="btn btn-warning btn-sm bg-myPrimary text-white join-item w-2/6"
                >
                  Change
                </button>
              </form>
            </div>
          </div>
          {/* change binding id */}
          <div>
            <div className={singleBoxStyle}>
              <form
                className="join w-full"
                onSubmit={() => handleUpdate({ trc20Address })}
              >
                <input
                  type="number"
                  placeholder="Binding ID"
                  className="input input-sm input-bordered border-myPrimary join-item w-4/6"
                  value={trc20Address}
                  onChange={(e) => setTrc20Address(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="btn btn-sm btn-warning bg-myPrimary text-white join-item w-2/6"
                >
                  Change
                </button>
              </form>
            </div>
          </div>
          {/* change login password */}
          <div>
            <div className={singleBoxStyle}>
              <form
                className="join w-full"
                onSubmit={() => handleUpdate({ loginPassword })}
              >
                <input
                  type="password"
                  placeholder="Login Password"
                  className="input input-sm input-bordered border-myPrimary join-item w-4/6"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="btn btn-warning btn-sm bg-myPrimary text-white join-item w-2/6"
                >
                  Change
                </button>
              </form>
            </div>
          </div>
          {/* change withdraw passwords */}
          <div>
            <div className={singleBoxStyle}>
              <form
                className="join w-full"
                onSubmit={() => handleUpdate({ withdrawalPassword })}
              >
                <input
                  type="number"
                  placeholder="Withdrawal Password"
                  className="input input-sm input-bordered border-myPrimary join-item w-4/6"
                  value={withdrawalPassword}
                  onChange={(e) => setWithdrawalPassword(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="btn btn-sm btn-warning bg-myPrimary text-white join-item w-2/6"
                >
                  Change
                </button>
              </form>
            </div>
          </div>
          {/* bonus  */}
          <div>
            <div className={singleBoxStyle}>
              <form className="join w-full" onSubmit={handleBonusAmount}>
                <input
                  type="number"
                  placeholder="Bonus Recharge"
                  className="input input-sm input-bordered border-myPrimary join-item w-4/6"
                  value={bonusAmount}
                  onChange={(e) => setBonusAmount(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="btn btn-warning btn-sm bg-myPrimary text-white join-item w-2/6"
                >
                  Bonus
                </button>
              </form>
            </div>
          </div>
          {/* approve recharge */}
          <div>
            <div className={singleBoxStyle}>
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
            </div>
          </div>
          
        </section>
      </section>
      <DeleteConfirm id={client._id} />
      <AlertBox id="client-error" text={error} alertType="alert-error" />
      <AlertBox id="client-success" text={success} alertType="alert-success" />
    </div>
  );
};
export default Client;
