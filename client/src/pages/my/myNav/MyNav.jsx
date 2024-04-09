import { IoWallet } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";
import { RiBankLine } from "react-icons/ri";
import { Link, useRouteLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MyNav = () => {
  const user = useRouteLoaderData("user");
  const configuration = useRouteLoaderData("configuration");
  const navigate = useNavigate();
  const iconStyle = "text-3xl mx-auto text-myPrimary";

  const handleCustomerService = () => {
    if (!configuration?.canMessage || !user?.canMessage) {
      return toast.error("Customer service is not available at the moment");
    } else {
      return navigate(user.isAdmin ? "chat" : `chat/${user._id}`);
    }
  };

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
      <p className="card" onClick={handleCustomerService}>
        <MdSupportAgent className={iconStyle} />
        <h2 className="text-sm my-1 text-black">Customer Service</h2>
      </p>
    </article>
  );
};
export default MyNav;
