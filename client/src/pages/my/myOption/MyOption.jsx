import { IoChevronForward } from "react-icons/io5";
import { Link, useRouteLoaderData } from "react-router-dom";
import { adminOptions, clientOptions } from './../../../data/myOptionData';
import Logout from './../../auth/Logout';

const MyOption = () => {
  const user = useRouteLoaderData("user");
  
  const myOptions = user.isAdmin ? adminOptions : clientOptions;

  return (
      <article className="mt-3 pb-20">
        {myOptions.map((option, i) => (
          <Link key={i} to={option.to} className="flex justify-between p-3 border-b-2 border-b-mySecondary text-black">
            <p className="text-start">
              <span>{option.icon}</span>
              <span>{option.name}</span>
            </p>
            <IoChevronForward />
          </Link>
        ))}
        <Logout />
      </article>
  );
};
export default MyOption;
