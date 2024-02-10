import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { transactionApi } from "../../../../router/axiosApi";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import AlertBox from "../../../shared/AlertBox";

const Withdraw = () => {
  const user = useRouteLoaderData("user");
  const { withdrawFee, minimumWithdraw } = useRouteLoaderData("configuration");
  const [serviceCharge, setServiceCharge] = useState(0);
  const [error, setError] = useState("An error occurred");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [actualAmount, setActualAmount] = useState(0);
  const withDrawAmount = watch("withDrawAmount");

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
    // transaction data
    const transaction = {
      client: user._id,
      credential: user.trc20Address,
      withDrawAmount: withDrawAmount,
      actualAmount: actualAmount,
      category: "Withdraw",
      password: data.withdrawalPassword,
    };
    try {
      // is time
      const options = { timeZone: "Europe/London", hour: "numeric" };
      const currentHour = new Date().toLocaleTimeString("en-GB", options);
      if (!(currentHour >= 9 && currentHour < 21)) {
        setError("Allowed trade time is 09:00 - 21:00 (UK)");
        return document.getElementById("withdraw-error").showModal();
      }
      // is usdt bind
      if (!user.trc20Address) {
        setError("Please Bind USDT");
        return document.getElementById("withdraw-error").showModal();
      }
      // request
      const res = await transactionApi.post("withdraw-request", {
        transaction,
      });
      if (res.data?.success) {
        document.getElementById("withdraw-success").showModal();
        //window.location.reload();
        navigate("/");
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError(err.message);
      }
      document.getElementById("withdraw-error").showModal();
    }
  };

  return (
    <section>
      <h1 className="text-lg font-semibold text-center pt-2 mb-5">Withdraw</h1>
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
        <label className="form-control w-full max-w-md mx-auto">
          <button
            type="submit"
            className="btn btn-warning bg-myPrimary text-white font-semibold w-full mt-5"
          >
            Withdraw
          </button>
        </label>
      </form>
      <AlertBox id="withdraw-error" text={error} alertType="alert-error" />
    </section>
  );
};
export default Withdraw;
