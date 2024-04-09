import { Link, useRouteLoaderData } from "react-router-dom";
import { FiPower } from "react-icons/fi";
import { IoChevronForward } from "react-icons/io5";
import { authApi } from "../../router/axiosApi";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { isSupported } from "firebase/messaging";

const Logout = () => {
  //const navigate = useNavigate();
  const user = useRouteLoaderData("user");
  const [deviceId, setDeviceId] = useState("");

  useEffect(() => {
    // get device id for notification
    (async () => {
      try {
        const fcmSupport = await isSupported();
        if (fcmSupport) {
          const { requestToken } = await import(
            "../../configuration/UseNotification.jsx"
          );
          const token = await requestToken();
          setDeviceId(token);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleClick = async () => {
    event.preventDefault();
    try {
      // unsubscribe from notification
      if (deviceId) {
        const data = {
          deviceId: deviceId,
          userId: user._id,
          isAdmin: user.isAdmin,
        };
        await authApi.post("logout", data);
      }
      await localStorage.removeItem("accessToken");

      toast.success("Logout Successful");
      window.location.reload();
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
        className="flex justify-between p-3 text-black"
        onClick={handleClick}
      >
        <p className="text-start">
          <FiPower className="text-myPrimary inline-block me-3 text-2xl" />
          <span>Logout</span>
        </p>
        <IoChevronForward />
      </Link>
    </>
  );
};
export default Logout;
