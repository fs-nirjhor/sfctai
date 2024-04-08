import { IoWallet } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";
import { RiBankLine } from "react-icons/ri";
import { Link, useRouteLoaderData } from "react-router-dom";

const MyNav = () => {
  const user = useRouteLoaderData("user");
  const iconStyle = "text-3xl mx-auto text-myPrimary";
  return (
    <article className="flex justify-evenly py-3 rounded-md m-2 bg-mySecondary bg-opacity-80">
      <Link to="recharge" className="card">
        <IoWallet className={iconStyle} />
        <h2 className="text-sm my-1 text-black">Recharge</h2>
      </Link>
      <Link to="withdraw" className="card">
        <RiBankLine className={iconStyle} />
        <h2 className="text-sm my-1 text-black">Withdraw</h2>
      </Link>
      <Link to={user.isAdmin ? "chat" : `chat/${user._id}`} className="card">
        <MdSupportAgent className={iconStyle} />
        <h2 className="text-sm my-1 text-black">Customer Service</h2>
      </Link>
    </article>
  );
};
export default MyNav;
