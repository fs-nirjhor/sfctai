import { useForm } from "react-hook-form";
import { userApi } from "../../../../router/axiosApi";
import { useRouteLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

const SetLoginPassword = () => {
  const user = useRouteLoaderData("user");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    event.preventDefault();
    try {
      const res = await userApi.put(`update-password/${user._id}`, data);
      res.data?.success && toast.success("Login password updated successfully");
    } catch (err) {
      if (err.response.data.message) {
        toast.error(err.response.data.message); // error sent by server
      } else {
        toast.error(err.message); // other error
      }
    }
  };

  return (
    <section>
      <h1 className="font-semibold text-center pt-2 mb-5">
        Modify Login Password
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="form-control w-full max-w-md mx-auto">
          <div className="label">
            <span className="label-text">New Password</span>
          </div>
          <input
            type="password"
            placeholder="Please enter the new password"
            name="newPassword"
            className="input bg-mySecondary w-full max-w-md text-center"
            required
            {...register("newPassword", {
              required: true,
              minLength: 6,
              maxLength: 8,
            })}
          />
          {errors.newPassword && (
            <div className="label">
              <span className="label-text-alt"></span>
              <span className="label-text-alt text-error font-medium">
                Password must have 6-8 letters or digit
              </span>
            </div>
          )}
        </label>
        <label className="form-control w-full max-w-md mx-auto">
          <div className="label">
            <span className="label-text">Confirm New Password</span>
          </div>
          <input
            type="password"
            placeholder="Please confirm the new password"
            name="confirmPassword"
            className="input bg-mySecondary w-full max-w-md text-center"
            required
            {...register("confirmPassword", {
              required: true,
              minLength: 6,
              maxLength: 8,
              validate: (value) => value === watch("newPassword"),
            })}
          />
          {errors.confirmPassword && (
            <div className="label">
              <span className="label-text-alt"></span>
              <span className="label-text-alt text-error font-medium">
                The passwords do not match
              </span>
            </div>
          )}
        </label>
        <label className="form-control w-full max-w-md mx-auto">
          <div className="label">
            <span className="label-text">Old Password</span>
          </div>
          <input
            type="password"
            placeholder="Please enter the current login password"
            name="loginPassword"
            className="input bg-mySecondary w-full max-w-md text-center"
            required
            {...register("loginPassword", {
              required: true,
              minLength: 6,
              maxLength: 8,
            })}
          />
          {errors.loginPassword && (
            <div className="label">
              <span className="label-text-alt"></span>
              <span className="label-text-alt text-error font-medium">
                Password must have 6-8 letters or digit
              </span>
            </div>
          )}
        </label>
        <label className="form-control w-full max-w-md mx-auto">
          <button
            type="submit"
            className="btn btn-myPrimary font-semibold w-full mt-5"
          >
            Submit
          </button>
        </label>
      </form>
    </section>
  );
};
export default SetLoginPassword;
