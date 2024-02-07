import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiPower } from "react-icons/fi";
import { IoChevronForward } from "react-icons/io5";
import { authApi } from "../../router/axiosApi";
import AlertBox from "../shared/AlertBox";

const Logout = () => {
  const [error, setError] = useState("An error occurred");
  const navigate = useNavigate();

  const handleClick = async () => {
    event.preventDefault();
    try {
      await authApi.post("logout");

      document.getElementById("logout-success").showModal();
      navigate("/login");
    } catch (err) {
      if (err.response?.data.message) {
        setError(err.response.data.message); // error sent by server
      } else {
        setError(err.message); // other error
      }
      document.getElementById("logout-error").showModal();
    }
  };

  return (
    <>
    <Link
      className="flex justify-between p-3 border-b-2 border-b-mySecondary text-black"
      onClick={handleClick}
    >
      <p className="text-start">
        <FiPower className="text-myPrimary inline-block me-3 text-2xl" />
        <span>Logout</span>
      </p>
      <IoChevronForward />
    </Link>
    <AlertBox id="logout-error" text={error} alertType="alert-error" />
    </>
  );
};
export default Logout;
