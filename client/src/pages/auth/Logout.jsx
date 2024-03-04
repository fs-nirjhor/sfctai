import { Link, useRouteLoaderData } from "react-router-dom";
import { FiPower } from "react-icons/fi";
import { IoChevronForward } from "react-icons/io5";
import { authApi } from "../../router/axiosApi";
import { toast } from "react-toastify";
import UseNotification from "../../data/UseNotification";

const Logout = () => {
  //const navigate = useNavigate();
  const {deviceId} = UseNotification()
  const user = useRouteLoaderData("user");

  const handleClick = async () => {
    event.preventDefault();
    try {
      localStorage.removeItem("accessToken");
      // unsubscribe from notification
      if (deviceId) {
      const data = { deviceId: deviceId, userId: user._id, isAdmin: user.isAdmin };
      await authApi.post("logout", data);
      }

      toast.success("Logout Successful");
      window.location.replace("/");
      //navigate("/login");
    } catch (err) {
      if (err.response?.data.message) {
        toast.error(err.response.data.message); // error sent by server
      } else {
        toast.error(err.message); // other error
      }
    }
  };

  return (
    <>
    <Link
      className="flex justify-between p-3 text-black font-serif"
      onClick={handleClick}
    >
      <p className="text-start">
        <FiPower className="text-primary inline-block me-3 text-2xl" />
        <span>Logout</span>
      </p>
      <IoChevronForward />
    </Link>
    </>
  );
};
export default Logout;
