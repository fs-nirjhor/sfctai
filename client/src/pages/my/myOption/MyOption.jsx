import { IoChevronForward } from "react-icons/io5";
import { Link, useRouteLoaderData } from "react-router-dom";
import MyOptionData from "./myOptionData";
import Logout from "./../../auth/Logout";
import DownloadApp from "./DownloadApp";

const MyOption = () => {
  const user = useRouteLoaderData("user");
  const myOptions = MyOptionData({ user });

  return (
    <article className="mt-3 mx-3 pb-20">
      {myOptions.map((option, i) => (
        <Link
          key={i}
          to={option.to}
          className="flex justify-between p-3 border-b-2 border-b-mySecondary text-black"
        >
          <p className="text-start">
            <span>{option.icon}</span>
            <span>{option.name}</span>
          </p>
          <IoChevronForward />
        </Link>
      ))}
      <DownloadApp />
      <Logout />
    </article>
  );
};
export default MyOption;
