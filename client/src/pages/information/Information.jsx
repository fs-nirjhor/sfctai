import information from "../../data/infoData";
import { Link } from "react-router-dom";

const Information = () => {
  return (
    <section>
      <h1 className="text-lg font-semibold text-center mt-2 mb-5">
        Information
      </h1>
      <figure className="font-semibold">
        {information.map((info, i) => {
          return (
            <Link
              className="bg-mySecondary p-3 mb-3 rounded-md block text-black"
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
