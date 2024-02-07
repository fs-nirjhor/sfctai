import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import AlertBox from "../shared/AlertBox";
import { authApi } from "../../router/axiosApi";

const Login = () => {
  const [error, setError] = useState("An error occurred");
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    event.preventDefault();
      try {
         await authApi.post("login", data);
        document.getElementById("login-success").showModal();
        navigate(location.state ? location.state.from : "/");
      } catch (err) {
        if (err.response?.data.message) {
          setError(err.response.data.message); // error sent by server
        } else {
          setError(err.message); // other error
        }
        document.getElementById("login-error").showModal();
      }
  };
 
  return (
    <section>
      <h1 className="text-lg font-semibold text-center mt-2 mb-5">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="px-5">
        <label className="form-control w-full max-w-md mx-auto">
          <div className="label">
            <span className="label-text">Phone Number</span>
          </div>
          <input 
            type="tel"
            placeholder="Please enter your phone number"
            name="phone"
            className="input bg-mySecondary w-full max-w-md text-center"
            required
            {...register("phone", {
              required: true,
              minLength: 8,
              maxLength: 18,
            })}
          />
          {errors.phone && (
            <div className="label">
              <span className="label-text-alt"></span>
              <span className="label-text-alt text-error font-medium">
               Phone Number must have 8-18 charecters
              </span>
            </div>
          )}
        </label>
        <label className="form-control w-full max-w-md mx-auto">
          <div className="label">
            <span className="label-text">Login Password</span>
          </div>
          <input
            type="password"
            placeholder="Please enter your login password"
            name="password"
            className="input bg-mySecondary w-full max-w-md text-center"
            required
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 8,
            })}
          />
          {errors.password && (
            <div className="label">
              <span className="label-text-alt"></span>
              <span className="label-text-alt text-error font-medium">
                Password must have 6-8 letters or digit
              </span>
            </div>
          )}
        </label>
        <label className="form-control w-full max-w-md mx-auto mt-5">
        <p className="text-xs text-center">Please allow third party cookies</p>
          <button
            type="submit"
            className="btn btn-warning bg-myPrimary text-white font-semibold w-full"
          >
            Login
          </button>
        </label>
      </form>
      <Link to="/registration?invitationCode=SYAI000" className="text-center mt-5 block">Don&apos;t have an account?</Link>
      <AlertBox id="login-error" text={error} alertType="alert-error" />
    </section>
  );
};
export default Login;
