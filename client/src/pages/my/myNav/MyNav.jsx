import { IoWallet } from "react-icons/io5";
import { BsEnvelopePaperHeart } from "react-icons/bs";
import { MdSupportAgent } from "react-icons/md";
import { Link, useRouteLoaderData } from "react-router-dom";

const MyNav = () => {
  const user = useRouteLoaderData("user");
  return (
    <article className="flex justify-evenly py-3 bg-mySecondary rounded-md mt-2">
      <Link to="wallet" className="card">
        <IoWallet className="text-3xl text-myPrimary mx-auto" />
        <h2 className="text-sm my-1 text-black">Wallet</h2>
      </Link>
      <Link to="invitation" className="card">
        <BsEnvelopePaperHeart className="text-3xl text-myPrimary mx-auto" />
        <h2 className="text-sm my-1 text-black">Invitation Letter</h2>
      </Link>
      <Link to={user.isAdmin ? "chat" : `chat/${user._id}`} className="card">
        <MdSupportAgent className="text-3xl text-myPrimary mx-auto" />
        <h2 className="text-sm my-1 text-black">Customer Service</h2>
      </Link>
    </article>
  );
};
export default MyNav;
