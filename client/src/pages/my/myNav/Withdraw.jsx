import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { transactionApi } from "../../../router/axiosApi";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { GoPlus } from "react-icons/go";
import Spinner from "../../shared/Spinner";

const Withdraw = () => {
  const user = useRouteLoaderData("user");
  const navigate = useNavigate();

  const { withdrawFee, minimumWithdraw } = useRouteLoaderData("configuration");
  const [serviceCharge, setServiceCharge] = useState(0);
  const [actualAmount, setActualAmount] = useState(0);
  const [processing, setProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const withDrawAmount = watch("withDrawAmount");
  const photo = watch("photo");

  const balance = user.transaction.balance;

  useEffect(() => {
    const fee = withDrawAmount * (withdrawFee / 100);

    if (withDrawAmount < 100) {
      setActualAmount(withDrawAmount - withdrawFee);
      setServiceCharge(`-${withdrawFee}`);
    }
    if (withDrawAmount >= 100) {
      setActualAmount(withDrawAmount - fee);
      setServiceCharge(`${withdrawFee}%`);
    }
    if (withDrawAmount < minimumWithdraw) {
      setActualAmount(0);
      setServiceCharge(0);
    }
  }, [withDrawAmount, withdrawFee, minimumWithdraw]);

  const onSubmit = async (data) => {
    event.preventDefault();
    if (processing) {
      return toast.error("Try again later");
    }
    // transaction data
    const formData = new FormData();
    formData.append("client", user._id);
    formData.append("credential", user.trc20Address);
    formData.append("withDrawAmount", withDrawAmount);
    formData.append("actualAmount", actualAmount);
    formData.append("password", data.withdrawalPassword);
    formData.append("photo", data.photo[0]);

    //validation
    // is time
    const options = { timeZone: "Asia/Riyadh", hour: "numeric" };
    const currentHour = new Date().toLocaleTimeString("en-GB", options);
    if (!(currentHour >= 10 && currentHour < 22)) {
      return toast.error(
        "Allowed withdraw time is 10:00 - 22:00 (Arabic Time)"
      );
    }
    // is usdt bind
    if (!user.trc20Address) {
      return toast.error("Please bind your id");
    }
    // is withdraw already
    if (user.transaction.todaysWithdraw) {
      return toast.error("Only 1 withdraw per day");
    }

    toast.loading(Spinner, {
      hideProgressBar: false,
      closeOnClick: false,
      draggable: false,
      progressClassName: "h-3",
      toastId: "withdraw-loading",
    });
    try {
      // request
      const onUploadProgress = (progressEvent) => {
        const progress = progressEvent.loaded / progressEvent.total;
        toast.update("withdraw-loading", { progress });
      };
      setProcessing(true);
      const res = await transactionApi.post("withdraw-request", formData, {
        onUploadProgress,
      });
      if (res.data?.success) {
        toast.success("The application is successfull.Waiting for review.");
        window.location.assign("/my");
        //navigate("/my");
      }
    } catch (err) {
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error(err.message);
      }
    }
    toast.done("withdraw-loading");
  };

  return (
    <section className="pb-20">
      <h1 className="font-semibold text-center pt-2 mb-5">Withdraw</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="form-control w-full max-w-md mx-auto">
          <div className="label">
            <span className="label-text">Cash Amount</span>
          </div>
          <input
            type="number"
            placeholder="Please enter the withdraw amount"
            name="withDrawAmount"
            className="input bg-mySecondary w-full max-w-md text-center"
            required
            {...register("withDrawAmount", {
              required: true,
              min: {
                value: minimumWithdraw,
                message: `Minimum withdraw amount is ${minimumWithdraw}`,
              },
              max: { value: balance, message: "Insufficient balance" },
              validate: (value) =>
                Number.isInteger(Number(value)) || "Please enter a full amount",
            })}
          />
          {errors.withDrawAmount && (
            <div className="label">
              <span className="label-text-alt"></span>
              <span className="label-text-alt text-error font-medium">
                {errors.withDrawAmount.message}
              </span>
            </div>
          )}
        </label>
        <label className="form-control w-full max-w-md mx-auto">
          <div className="label">
            <span className="label-text">Service Charge</span>
          </div>
          <p className=" bg-mySecondary w-full max-w-md text-center py-2 rounded-md">
            {serviceCharge}
          </p>
        </label>
        <label className="form-control w-full max-w-md mx-auto">
          <div className="label">
            <span className="label-text">Actual Amount</span>
          </div>
          <p className=" bg-mySecondary w-full max-w-md text-center py-2 rounded-md">
            ${actualAmount.toFixed(2)}
          </p>
        </label>
        <label className="form-control w-full max-w-md mx-auto">
          <div className="label">
            <span className="label-text">Withdraw Password</span>
          </div>
          <input
            type="password"
            placeholder="Please enter the withdraw password"
            name="withdrawalPassword"
            className="input bg-mySecondary w-full max-w-md text-center"
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
        <div className="w-full max-w-md mx-auto">
          <div className="label">
            <span className="label-text">Face Verification</span>
          </div>
          <label className="form-control w-40 mx-auto">
            <div className="relative ">
              <span
                className={`absolute bg-gray-300 bg-opacity-80 w-full h-full flex justify-center items-center rounded ${
                  photo?.length && "hidden"
                }`}
              >
                <GoPlus className="text-6xl text-white" />
              </span>
              <img
                src="/images/face.jpg"
                alt="face"
                className="w-full rounded"
              />
            </div>
            <input
              type="file"
              capture="user"
              accept="image/*"
              name="photo"
              className="hidden"
              //required
              {...register("photo", {
                required: true,
              })}
            />
            {errors.photo && (
              <div className="label">
                <span className="label-text-alt"></span>
                <span className="label-text-alt text-error font-medium">
                  Please verify your photo
                </span>
              </div>
            )}
          </label>
        </div>
        <label className="form-control w-full max-w-md mx-auto">
          <button
            type="submit"
            className={`btn bg-white text-black font-semibold w-full mt-5 ${
              processing && "btn-disabled"
            }`}
          >
            Withdraw
          </button>
        </label>
      </form>
    </section>
  );
};
export default Withdraw;
