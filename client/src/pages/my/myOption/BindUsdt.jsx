import { useState } from "react";
import AlertBox from "../../shared/AlertBox";
import { userApi } from "../../../router/axiosApi";
import { useNavigate, useRouteLoaderData } from "react-router-dom";

const BindUsdt = () => {
  const user = useRouteLoaderData("user")
  const [trc20Address, setTrc20Address] = useState(user.trc20Address);
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const handleChange = (e) => {
    e.preventDefault();
    if (!user.trc20Address) {
    setTrc20Address(e.target.value);
    } else {
      setError("Binding ID can not be changed")
      document.getElementById("bind-error").showModal();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (trc20Address.length !== 20) {
        setError("Invalid Binding ID")
        document.getElementById("bind-error").showModal();
      }
      else if (!user.trc20Address) {
      const res = await userApi.put(user._id, {trc20Address});
      if (res.data?.success) {
         document.getElementById("bind-success").showModal();
         navigate("/")
      }
      } else {
        setError("Binding ID can not be changed")
        document.getElementById("bind-error").showModal();
      }
    } catch (err) {
      if (err.response?.data.message) {
        setError(err.response.data.message); // error sent by server
      } else {
        setError(err.message); // other error
      }
      document.getElementById("bind-error").showModal();
    }
  };
  return (
    <section>
      <h1 className="text-lg font-semibold text-center mt-2 mb-5">
        Wallet Address
      </h1>
      <form onSubmit={handleSubmit}>
        <label className="form-control w-full max-w-md mx-auto">
          <input
            type="text"
            placeholder="Please enter your ID address"
            name="trc20Address"
            value={trc20Address}
            className="input bg-mySecondary w-full max-w-md text-center"
            onChange={handleChange}
            required
          />
          <div className="label">
            <p className="label-text">About Binding ID</p>
          </div>
        </label>
        {!user.trc20Address && <label className="form-control w-full max-w-md mx-auto">
          <button
            type="submit"
            className="btn btn-warning bg-myPrimary text-white font-semibold w-full mt-5"
          >
            Submit
          </button>
        </label>}
      </form>
      <AlertBox id="bind-error" text={error} alertType="alert-error" />
    </section>
  );
};
export default BindUsdt;
