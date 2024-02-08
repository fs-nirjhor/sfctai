import { IoChevronForward } from "react-icons/io5";
import { Link, useRouteLoaderData } from "react-router-dom";

const Set = () => {
  const user = useRouteLoaderData("user");
  return (
    <article>
      <h1 className="text-lg font-semibold text-center pt-2 mb-5">Set</h1>
      <Link
        to="information"
        className="flex justify-between p-3 border-b-2 border-b-mySecondary text-black"
      >
        <p>Modify Information</p>
        <IoChevronForward />
      </Link>
      <Link
        to="login-password"
        className="flex justify-between p-3 border-b-2 border-b-mySecondary text-black"
      >
        <p>Modify Login Password</p>
        <IoChevronForward />
      </Link>
      <Link
        to="withdrawal-password"
        className="flex justify-between p-3 border-b-2 border-b-mySecondary text-black"
      >
        <p>Modify Withdrawal Password</p>
        <IoChevronForward />
      </Link>
      {user.isAdmin && (
        <Link
          to="configuration"
          className="flex justify-between p-3 border-b-2 border-b-mySecondary text-black"
        >
          <p>Site Configuration</p>
          <IoChevronForward />
        </Link>
      )}
    </article>
  );
};
export default Set;
