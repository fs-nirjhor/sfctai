import { Link } from "react-router-dom";

const NotificationToast = ({ payload }) => {
  const data = payload?.data;
  return (
    <Link
      to={data?.link}
      className="flex gap-3 justify-between items-center text-white"
    >
      <figure className="image">
        <div className="w-8">
          <img src={data?.icon || "/images/icon.png"} alt="aftaai" />
        </div>
      </figure>
      <div className="flex-grow">
        {data?.image ? (
          <img src={data?.image} alt="image" className="w-40" />
        ) : (
          <div>
            <h5 className="">{data?.title}</h5>
            <p className="text-gray-300">{data?.body}</p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default NotificationToast;
