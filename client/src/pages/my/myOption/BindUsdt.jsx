import { useState } from "react";
import { userApi } from "../../../router/axiosApi";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

const BindUsdt = () => {
  const user = useRouteLoaderData("user");
  const [trc20Address, setTrc20Address] = useState(user.trc20Address);
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    if (!user.trc20Address) {
      setTrc20Address(e.target.value);
    } else {
      toast.error("Binding ID can not be changed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (trc20Address.length !== 20) {
        toast.error("Invalid Binding ID");
      } else if (!user.trc20Address) {
        const res = await userApi.put(user._id, { trc20Address });
        if (res.data?.success) {
          toast.success("Binding successfully");
          window.location.assign("/my");
          //navigate("/");
        }
      } else {
        toast.error("Binding ID can not be changed");
      }
    } catch (err) {
      if (err.response?.data.message) {
        toast.error(err.response.data.message); // error sent by server
      } else {
        toast.error(err.message); // other error
      }
    }
  };
  return (
    <section>
      <h1 className="font-semibold text-center pt-2 mb-5">Wallet Address</h1>
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
        {!user.trc20Address && (
          <label className="form-control w-full max-w-md mx-auto">
            <button
              type="submit"
              className="btn btn-primary font-semibold w-full mt-5"
            >
              Submit
            </button>
          </label>
        )}
      </form>
    </section>
  );
};
export default BindUsdt;
