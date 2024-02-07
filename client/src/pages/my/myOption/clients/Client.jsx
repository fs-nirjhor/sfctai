/* eslint-disable no-undef */
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../../shared/Loading";
import { useEffect, useState } from "react";
import { transactionApi, userApi } from "../../../../router/axiosApi";
import AlertBox from "../../../shared/AlertBox";

const Client = () => {
  const { userId } = useParams();
  const [client, setClient] = useState({});
  const [approveRechargeAmount, setApproveRechargeAmount] = useState("");
  const [bonusAmount, setBonusAmount] = useState("");
  const [trc20Address, setTrc20Address] = useState("");
  const [phone, setPhone] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [withdrawalPassword, setWithdrawalPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getClient = async () => {
      try {
        const response = await userApi.get(userId);
        if (response.data?.success) {
          setClient(response.data.payload.user);
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
  }, [userId]);

  const handleApproveRecharge = async () => {
    event.preventDefault();
    try {
      // recharge data
      const recharge = { client: client._id, amount: approveRechargeAmount };
      const response = await transactionApi.put("add-recharge", { recharge });
      if (response.data?.success) {
        document.getElementById("recharge-success").showModal();
        setApproveRechargeAmount("");
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
    try {
      const res = await userApi.delete(client._id);
      if (res.data?.success) {
        setSuccess("Successfully deleted");
        document.getElementById("delete-success").showModal();
        navigate(-1);
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

  return loading ? (
    <Loading />
  ) : (
    <div className="pb-20">
      <h1 className="text-lg font-semibold text-center mt-2 mb-5">
        {client.name}
      </h1>
      <section>
        <figure className="avatar w-full">
          <div
            className={`w-24 h-24 mx-auto mb-5 rounded-full ring ${
              client.transaction?.balance >= 10
                ? "ring-myPrimary"
                : "ring-mySecondary"
            }`}
          >
            <img src={client.avatar} alt="avatar" />
          </div>
        </figure>
        <table className="table border-collapse table-fixed bg-mySecondary w-full">
          {/* head */}
          <thead>
            <tr>
              <th>About</th>
              <th>Transaction</th>
            </tr>
          </thead>
          <tbody>
            {/* name - balance */}
            <tr>
              <td>Name: {client.name}</td>
              <td>Balance: {client.transaction.balance.toFixed(2)}</td>
            </tr>
            {/* phone - income */}
            <tr>
              <td>Phone: {client.phone}</td>
              <td>Income: {client.transaction.totalIncome.toFixed(2)}</td>
            </tr>
            {/* userid - recharge */}
            <tr>
              <td>UserId: {client.userId}</td>
              <td>Recharge: {client.transaction.totalRecharge.toFixed(2)}</td>
            </tr>
            {/* BINDING - WITHDRAW */}
            <tr>
              <td>Binding Id: {client.trc20Address}</td>
              <td>Withdraw: {client.transaction.totalWithdraw.toFixed(2)}</td>
            </tr>
            {/* change phone */}
            <tr>
              <td colSpan={2}>
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
              </td>
            </tr>
            {/* change binding id */}
            <tr>
              <td colSpan={2}>
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
              </td>
            </tr>
            {/* change login password */}
            <tr>
              <td colSpan={2}>
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
              </td>
            </tr>
            {/* change withdraw passwords */}
            <tr>
              <td colSpan={2}>
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
              </td>
            </tr>
            {/* approve recharge */}
            <tr>
              <td colSpan={2}>
                <form className="join w-full" onSubmit={handleApproveRecharge}>
                  <input
                    type="number"
                    placeholder="Appprove Recharge"
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
              </td>
            </tr>
            {/* bonus  */}
            <tr>
              <td colSpan={2}>
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
              </td>
            </tr>
            {/* message and delete */}
            <tr>
              <td>
                <Link
                  to={`/my/chat/${client._id}`}
                  className="btn btn-warning w-full btn-sm text-white"
                >
                  Message
                </Link>
              </td>
              <td>
                <button
                  className="btn btn-error w-full btn-sm text-white"
                  onClick={handleDelete}
                >
                  Delete User
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <AlertBox id="client-error" text={error} alertType="alert-error" />
      <AlertBox id="client-success" text={success} alertType="alert-success" />
    </div>
  );
};
export default Client;
