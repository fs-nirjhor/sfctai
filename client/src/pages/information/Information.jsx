import information from "../../data/infoData";
import { Link } from "react-router-dom";

const Information = () => {
  return (
    <section>
      <h1 className="font-semibold text-center pt-2 mb-5">About</h1>
      <figure className="font-semibold">
        {information.map((info, i) => {
          return (
            <Link
              className="bg-mySecondary p-3 mb-3 rounded-md block text-black font-light"
              to={info.link}
              key={i}
            >
              {info.title}
            </Link>
          );
        })}
      </figure>
    </section>
  );
};
export default Information;
