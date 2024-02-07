import { useForm } from "react-hook-form";
import { useState } from "react";
import AlertBox from "../shared/AlertBox";
import { Link,  useNavigate, useSearchParams } from "react-router-dom";
import { authApi, userApi } from "../../router/axiosApi";

const Registration = () => {
  const [error, setError] = useState("An error occurred");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const invitationCode = searchParams.get("invitationCode") || "";

  const onSubmit = async (data) => {
    event.preventDefault();
    try {
      await userApi.post("registration", data);
      document.getElementById("registration-success").showModal();
      await authApi.post("login", {password: data.loginPassword, phone: data.phone});
      navigate("/my")
    } catch (err) {
      if (err.response.data.message) {
        setError(err.response.data.message); // error sent by server
      } else {
        setError(err.message); // other error
      }
      document.getElementById("registration-error").showModal();
    }
  };


  return (
    <section className="bg-gradient-to-t from-myPrimary to-transparent min-h-full pb-40 px-5">
      <h1 className="text-lg font-semibold text-center mt-2 mb-5">
        Registration
      </h1>
      <figure>
        <img
          src="/images/bannar/coin_bannar.png"
          alt="coin-bannar"
          className="mx-auto max-w-md my-5"
        />
      </figure>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="form-control w-full max-w-md mx-auto">
          <div className="label">
            <span className="label-text">Phone Number</span>
          </div>
          <input
            type="tel"
            placeholder="Please enter your phone number"
            name="phone"
            className="input w-full max-w-md text-center"
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
            <span className="label-text">Name</span>
          </div>
          <input
            type="text"
            placeholder="Enter your name"
            name="name"
            className="input w-full max-w-md text-center"
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
          <div className="label">
            <span className="label-text">Login Password</span>
          </div>
          <input
            type="password"
            placeholder="Please enter your login password"
            name="loginPassword"
            className="input w-full max-w-md text-center"
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
          <div className="label">
            <span className="label-text">Withdrawal Password</span>
          </div>
          <input
            type="password"
            placeholder="Please enter your withdrawal password"
            name="withdrawalPassword"
            className="input w-full max-w-md text-center"
            required
            {...register("withdrawalPassword", {
              required: true,
              minLength: 6,
              maxLength: 8,
            })}
          />
          {errors.withdrawalPassword && (
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
            <span className="label-text">Invitation Code</span>
          </div>
          <input
            type="text"
            placeholder="Enter a invitation code"
            name="invitationCode"
            className="input w-full max-w-md text-center"
            defaultValue={invitationCode}
            required
            {...register("invitationCode", {
              required: true,
              minLength: 7,
              maxLength: 7,
            })}
          />
          {errors.invitationCode && (
            <div className="label">
              <span className="label-text-alt"></span>
              <span className="label-text-alt text-error font-medium">
                Invitation code must have 7 charecters
              </span>
            </div>
          )}
        </label>
        <label className="form-control w-full max-w-md mx-auto flex flex-row mt-10">
          <input type="checkbox" className="accent-myPrimary me-2" readOnly checked/>
          <span className="text-sm">Agree with all terms and conditions. Please Allow third party cookie</span> 
        </label>

        <label className="form-control w-full max-w-md mx-auto">
          <button
            type="submit"
            className="btn btn-warning bg-myPrimary text-white font-semibold w-full mt-3"
          >
            Registration
          </button>
        </label>
      </form>
      <Link to="/login" className="text-center mt-5 block">
        Already have an account?
      </Link>
      <AlertBox id="registration-error" text={error} alertType="alert-error" />
    </section>
  );
};
export default Registration;
