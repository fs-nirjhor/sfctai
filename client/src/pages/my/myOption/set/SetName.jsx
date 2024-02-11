import { useState } from "react";
import { useForm } from "react-hook-form";
import { userApi } from "../../../../router/axiosApi";
import { useRouteLoaderData } from "react-router-dom";
import AlertBox from "../../../shared/AlertBox";

const SetName = () => {
  const user = useRouteLoaderData("user");
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    event.preventDefault();
    const updates = {};
    if (data.name) {
      updates.name = data.name;
    }
    try {
      const res = await userApi.put(user._id, updates);
      res.data?.success &&
        document.getElementById("update-success").showModal();
    } catch (err) {
      if (err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError(err.message);
      }
      document.getElementById("update-error").showModal();
    }
  };

  return (
    <section>
      <h1 className="font-semibold text-center pt-2 mb-5">Modify Name</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="form-control w-full max-w-md mx-auto">
          <input
            type="text"
            placeholder="Update your name"
            name="name"
            className="input bg-mySecondary w-full max-w-md text-center"
            {...register("name", {
              minLength: 3,
              maxLength: 10,
            })}
          />
          {errors.name && (
            <div className="label">
              <span className="label-text-alt"></span>
              <span className="label-text-alt text-error font-medium">
                Name must have 3-10 letters
              </span>
            </div>
          )}
        </label>
        <label className="form-control w-full max-w-md mx-auto">
          <button
            type="submit"
            className="btn btn-warning bg-myPrimary text-white font-semibold w-full mt-5"
          >
            Submit
          </button>
        </label>
      </form>
      <AlertBox id="update-error" text={error} alertType="alert-error" />
    </section>
  );
};
export default SetName;
