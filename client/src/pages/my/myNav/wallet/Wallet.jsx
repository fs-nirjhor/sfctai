import { Link, useRouteLoaderData } from "react-router-dom";

const Wallet = () => {
  const user = useRouteLoaderData("user");
  const {transaction} = user;
  const balance = transaction.balance.toFixed(4);
  return (
    <section>
      <h1 className="text-lg font-semibold text-center mt-2 mb-5">Wallet</h1>
      <figure className="bg-mySecondary p-3 rounded-md text-center">
        <h3>Wallet Balance</h3>
        <h1 className="mt-2 text-2xl font-bold text-myPrimary">
          {balance}
        </h1>
        <div className="grid grid-cols-2 gap-4 mt-5">
          <Link to="recharge" className="btn btn-outline btn-warning w-full">
            Recharge
          </Link>
          <Link to="withdraw" className="btn btn-outline btn-warning w-full">
            Withdraw
          </Link>
        </div>
      </figure>
    </section>
  );
};
export default Wallet;
