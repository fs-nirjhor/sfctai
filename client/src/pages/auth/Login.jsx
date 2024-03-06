import { useForm } from "react-hook-form";
import { useLocation, Link } from "react-router-dom";
import { authApi } from "../../router/axiosApi";
import { toast } from "react-toastify";
import UseNotification from "../../configuration/UseNotification";

const Login = () => {
  const location = useLocation();
  // get device id for notification
  const { deviceId } = UseNotification();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    event.preventDefault();
    try {
      data.deviceId = deviceId;
      const loggedUser = await authApi.post("login", data);
      if (loggedUser?.data?.success) {
        // set access token
        const accessToken = loggedUser.data?.payload.accessToken;
        localStorage.setItem("accessToken", accessToken);
      }
      toast.success("Logged in successfully");
      //navigate(location.state ? location.state.from : "/");
      window.location.replace(
        location.state ? location.state?.from?.pathname : "/my"
      );
    } catch (err) {
      if (err.response?.data.message) {
        toast.error(err.response.data.message); // error sent by server
      } else {
        toast.error(err.message); // other error
      }
    }
  };

  return (
    <section className="bg-gradient-to-t from-white to-transparent min-h-full pb-40 px-5">
      <h1 className="font-semibold text-center pt-2 mb-5">Login</h1>
      <figure className="px-5">
        <img src="/images/logo.png" alt="SFCTAI" className="mx-auto w-60" />
      </figure>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[url('/images/bannar/coin_bannar.png')] bg-top bg-origin-border bg-cover bg-scroll bg-no-repeat pt-5"
      >
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
          <button
            type="submit"
            className="btn btn-primary font-semibold w-full"
          >
            Login
          </button>
        </label>
      </form>
      <Link
        to="/registration?invitationCode=SFCTAI"
        className="text-center mt-5 block"
      >
        Don&apos;t have an account?
      </Link>
    </section>
  );
};
export default Login;
