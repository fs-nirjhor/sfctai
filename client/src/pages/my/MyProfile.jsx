import { useRouteLoaderData } from "react-router-dom";
import { MdVerified } from "react-icons/md";

const MyProfile = () => {
  const user = useRouteLoaderData("user");
  const { transaction } = user;
  const balance = transaction.balance.toFixed(2);
  const hasNidAndEmail =
    user?.authentication?.status === "approved" && user?.email;
  return (
    <article className="card card-side mt-3 px-2">
      <figure className="avatar">
        <div className="h-24">
          <img src={user.avatar} alt="avatar" />
        </div>
      </figure>
      <div className="card-body">
        <h2 className="font-semibold flex items-center gap-1">
          <span>Name: {user.name}</span>
          <span>
            {hasNidAndEmail && <MdVerified className="text-green-500 inline" />}
          </span>
        </h2>
        <p className="text-gray-400">Id: {user.userId}</p>
        <p className="text-gray-400">Balance: {balance} USDT</p>
      </div>
    </article>
  );
};
export default MyProfile;
