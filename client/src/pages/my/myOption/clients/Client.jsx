/* eslint-disable no-undef */
import { Link, useParams } from "react-router-dom";
import Loading from "../../../shared/Loading";
import { useEffect, useState } from "react";
import { transactionApi, userApi } from "../../../../router/axiosApi";
import DeleteConfirm from "./../set/DeleteConfirm";
import ApproveRecharge from "./ApproveRecharge";
import ApproveWithdraw from "./ApproveWithdraw";
import { toast } from "react-toastify";
import moment from "moment";

const Client = () => {
  const { userId } = useParams();
  const [client, setClient] = useState({});
  const [pendingRecharge, setPendingRecharge] = useState([]);
  const [pendingWithdraw, setPendingWithdraw] = useState([]);
  const [bonusAmount, setBonusAmount] = useState("");
  const [trc20Address, setTrc20Address] = useState("");
  const [phone, setPhone] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [withdrawalPassword, setWithdrawalPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    // get client data
    const getClient = async () => {
      try {
        // get client
        const userData = await userApi.get(userId);
        if (userData.data?.success) {
          setClient(userData.data.payload.user);
          setLoading(false);
        }
      } catch (err) {
        if (err.response.data.message) {
          toast.error(err.response.data.message); // error sent by server
        } else {
          toast.error(err.message); // other error
        }
      }
    };
    // get pending transactions
    const getPendingTransactions = async () => {
      try {
        const filter = {
          client: userId,
          isApproved: false,
          isRejected: false,
          category: { $ne: "Order" },
        };
        const pendingTransactionData = await transactionApi.post("", {
          filter,
        });
        if (pendingTransactionData.data?.success) {
          const pendingTransactions =
            pendingTransactionData?.data?.payload?.allTransaction;
          const recharges = pendingTransactions.filter(
            (transaction) => transaction.category == "Recharge"
          );
          const withdraws = pendingTransactions.filter(
            (transaction) => transaction.category == "Withdraw"
          );
          setPendingRecharge(recharges);
          setPendingWithdraw(withdraws);
        }
      } catch (err) {
        if (err.response.data.message) {
          toast.error(err.response.data.message); // error sent by server
        } else {
          toast.error(err.message); // other error
        }
      }
    };
    getClient();
    getPendingTransactions();
  }, [userId]);

  const handleUpdate = async (update) => {
    event.preventDefault();
    try {
      setProcessing(true);
      const res = await userApi.put(client._id, update);
      if (res.data?.success) {
        toast.success("Updated successfully");
        window.location.reload();
      }
    } catch (err) {
      if (err.response?.data.message) {
        toast.error(err.response.data.message); // error sent by server
      } else {
        toast.error(err.message); // other error
      }
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
        credential: "",
        category: "Recharge",
        isApproved: true,
      };
      setProcessing(true);
      const res = await transactionApi.post("recharge-request", {
        transaction,
      });
      // recharge data
      const recharge = { client: client._id, amount: bonusAmount };
      const response = await transactionApi.put("add-recharge", { recharge });
      if (res.data?.success && response.data?.success) {
        toast.success("Recharge successfully");
        setBonusAmount("");
        window.location.reload();
      }
    } catch (err) {
      if (err.response?.data.message) {
        toast.error(err.response.data.message); // error sent by server
      } else {
        toast.error(err.message); // other error
      }
    }
  };
  const dateOfBirth = moment(client.dateOfBirth).format("DD/MM/YYYY");
  const doubleBoxStyle = "grid grid-cols-2 p-2 gap-3";
  const singleBoxStyle = "p-2";
  return loading ? (
    <Loading />
  ) : (
    <div className="pb-20 px-2">
      <h1 className="font-semibold text-center pt-2 mb-5">{client.name}</h1>
      <section>
        <figure className="avatar w-full">
          <div
            className={`w-24 h-24 mx-auto rounded-full ring ${
              client.transaction?.balance >= 10 ||
              client.transaction?.isOrderPending
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
          {/* name - balance */}
          <div className={doubleBoxStyle}>
            <div className="overflow-x-auto">Name: {client.name}</div>
            <div>Balance: {client?.transaction?.balance?.toFixed(2)}</div>
          </div>
          {/* phone - income */}
          <div className={doubleBoxStyle}>
            <div>Phone: {client.phone}</div>
            <div>
              Income:{" "}
              {(
                client?.transaction?.totalIncome +
                client?.transaction?.totalTeamIncome
              )?.toFixed(2)}
            </div>
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
          {/* Email - Date of birth */}
          <div className={doubleBoxStyle}>
            <div className="overflow-x-auto">Email: {client.email}</div>
            <div>Date of birth: {client.dateOfBirth && dateOfBirth}</div>
          </div>
          {/* Team and fund history */}
          <div className="grid grid-cols-3 p-2 gap-2">
            <Link
              to="team"
              className="btn btn-warning btn-sm text-white"
              state={client}
            >
              Team
            </Link>
            <Link
              to="fund-history"
              className="btn btn-warning btn-sm text-white"
              state={client}
            >
              Fund History
            </Link>
            <Link
              to="trade-history"
              className="btn btn-warning btn-sm text-white"
              state={client}
            >
              Trade History
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
                  type="tel"
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
                  type="text"
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
                  type="password"
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
                  className={`btn btn-warning btn-sm bg-myPrimary text-white join-item w-2/6 ${
                    processing && "btn-disabled"
                  }`}
                >
                  Bonus
                </button>
              </form>
            </div>
          </div>
          {/* approve recharge */}
          <div className={singleBoxStyle}>
            <ApproveRecharge
              id={client._id}
              pendingRecharge={pendingRecharge}
            />
          </div>
          {/* approve withdraw */}
          <div className={singleBoxStyle}>
            <ApproveWithdraw
              id={client._id}
              pendingWithdraw={pendingWithdraw}
            />
          </div>
        </section>
      </section>
      <DeleteConfirm id={client._id} />
    </div>
  );
};
export default Client;
