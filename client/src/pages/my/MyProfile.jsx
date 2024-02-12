import { useRouteLoaderData } from "react-router-dom";

const MyProfile = () => {
  const user = useRouteLoaderData("user");
  const {transaction} = user;
  const balance = transaction.balance.toFixed(2);
  return (
    <article className="card card-side mt-3 px-2">
      <figure className="avatar">
        <div className="h-24">
          <img src={user.avatar} alt="avatar" />
        </div>
      </figure>
      <div className="card-body">
        <h2 className="font-semibold">Name: {user.name}</h2>
        <p className="text-gray-400">Id: {user.userId}</p>
        <p className="text-gray-400">Balance: {balance} USDT</p>
      </div>
    </article>
  );
};
export default MyProfile;
