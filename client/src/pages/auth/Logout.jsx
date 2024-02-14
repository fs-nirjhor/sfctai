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
      await authApi.post("logout");

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
      className="flex justify-between p-3 border-b-2 border-b-mySecondary text-black font-serif"
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
