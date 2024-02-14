import { useNavigate, Link } from "react-router-dom";
import { FiPower } from "react-icons/fi";
import { IoChevronForward } from "react-icons/io5";
import { authApi } from "../../router/axiosApi";
import { toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    event.preventDefault();
    try {
      // for cookie 
      await authApi.post("logout");
      // for bearer token 
      localStorage.removeItem("accessToken");

      toast.success("Logout Successful")
      navigate("/login");
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
