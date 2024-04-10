import { useRouteLoaderData } from "react-router-dom";
import { userApi } from "../../../../router/axiosApi";
import { toast } from "react-toastify";

const ClientPermission = ({ client, handleUpdate, setReload }) => {
  const user = useRouteLoaderData("user");
  // variables
  const isPhoto =
    client?.authentication?.frontPhoto && client?.authentication?.backPhoto;
  const status = client?.authentication?.status;
  const isBanned = client?.isBanned;
  const isAdmin = client?.isAdmin;
  const canMessage = client?.canMessage;
  const canOrder = client?.canOrder;
  const canWithdraw = client?.canWithdraw;

  const handleAproveNid = async () => {
    event.preventDefault();
    try {
      const res = await userApi.put(`approve-nid/${client?._id}`);
      if (res.data?.success) {
        toast.success("Approved successfully");
        setReload((prev) => prev + 1);
      }
    } catch (err) {
      if (err.response?.data.message) {
        toast.error(err.response.data.message); // error sent by server
      } else {
        toast.error(err.message); // other error
      }
    }
  };
  const handleRejectNid = async () => {
    event.preventDefault();
    try {
      const res = await userApi.put(`reject-nid/${client?._id}`);
      if (res.data?.success) {
        toast.success("Rejected successfully");
        setReload((prev) => prev + 1);
      }
    } catch (err) {
      if (err.response?.data.message) {
        toast.error(err.response.data.message); // error sent by server
      } else {
        toast.error(err.message); // other error
      }
    }
  };
  // styles
  const boxStyle = "flex justify-between bg-white pt-2 px-2 mb-2 rounded";
  return (
    <section>
      <div className="bg-white p-2 mb-2 rounded">
        <div className={boxStyle}>
          <h3 className={`mb-3 font-semibold `}>Authentication ({status})</h3>
          {status === "pending" && (
            <div className="join ">
              <button
                className="btn btn-success btn-sm text-white join-item"
                onClick={handleAproveNid}
              >
                Approve
              </button>
              <button
                className="btn btn-error btn-sm text-white join-item"
                onClick={handleRejectNid}
              >
                Reject
              </button>
            </div>
          )}
        </div>
        {isPhoto ? (
          <div className="flex justify-between max-w-md gap-3 mx-auto mb-2 font-semibold text-center text-xs">
            <figure>
              <p>Front Photo</p>
              <img
                src={client?.authentication?.frontPhoto}
                alt="frontPhoto"
                className="p-2"
              />
            </figure>
            <figure>
              <p>Back Photo</p>
              <img
                src={client?.authentication?.backPhoto}
                alt="backPhoto"
                className="p-2"
              />
            </figure>
          </div>
        ) : (
          <p className="text-center my-2">No Photo</p>
        )}
      </div>
      {/* handle message permission */}
      <div className={boxStyle}>
        <h3
          className={`mb-3 font-semibold ${
            canMessage ? "text-green-500" : "text-red-500"
          }`}
        >
          {canMessage ? "Message Allowed" : "Message Not Allowed"}
        </h3>
        <input
          type="checkbox"
          className="toggle toggle-success"
          checked={canMessage || false}
          onChange={() => handleUpdate({ canMessage: !canMessage })}
        />
      </div>
      {/* handle withdraw permission */}
      <div className={boxStyle}>
        <h3
          className={`mb-3 font-semibold ${
            canWithdraw ? "text-green-500" : "text-red-500"
          }`}
        >
          {canWithdraw ? "Withdraw Allowed" : "Withdraw Not Allowed"}
        </h3>
        <input
          type="checkbox"
          className="toggle toggle-success"
          checked={canWithdraw || false}
          onChange={() => handleUpdate({ canWithdraw: !canWithdraw })}
        />
      </div>
      {/* handle order permission */}
      <div className={boxStyle}>
        <h3
          className={`mb-3 font-semibold ${
            canOrder ? "text-green-500" : "text-red-500"
          }`}
        >
          {canOrder ? "Order Allowed" : "Order Not Allowed"}
        </h3>
        <input
          type="checkbox"
          className="toggle toggle-success"
          checked={canOrder || false}
          onChange={() => handleUpdate({ canOrder: !canOrder })}
        />
      </div>
      {client?._id !== user?._id && (
        <div>
          {/* handle banned */}
          <div className={boxStyle}>
            <h3
              className={`mb-3 font-semibold ${
                isBanned ? "text-green-500" : "text-red-500"
              }`}
            >
              {isBanned ? "Banned" : "Not Banned"}
            </h3>
            <input
              type="checkbox"
              className="toggle toggle-success"
              checked={isBanned || false}
              onChange={() => handleUpdate({ isBanned: !isBanned })}
            />
          </div>
          {/* handle admin */}
          <div className={boxStyle}>
            <h3
              className={`mb-3 font-semibold ${
                isAdmin ? "text-green-500" : "text-red-500"
              }`}
            >
              {isAdmin ? "Admin" : "Not Admin"}
            </h3>
            <input
              type="checkbox"
              className="toggle toggle-success"
              checked={isAdmin || false}
              onChange={() => handleUpdate({ isAdmin: !isAdmin })}
            />
          </div>
        </div>
      )}
    </section>
  );
};
export default ClientPermission;
