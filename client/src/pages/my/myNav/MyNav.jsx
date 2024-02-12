import { IoWallet } from "react-icons/io5";
import { RiBankLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const MyNav = () => {
  return (
    <article className="flex justify-evenly py-3 rounded-md mt-2 font-serif">
      <Link to="recharge" className="card">
        <IoWallet className="text-3xl text-white mx-auto" />
        <h2 className="text-sm my-1 text-black">Recharge</h2>
      </Link>
      <Link to="withdraw" className="card">
        <RiBankLine className="text-3xl text-white mx-auto" />
        <h2 className="text-sm my-1 text-black">Withdraw</h2>
      </Link>
    </article>
  );
};
export default MyNav;
