import { useRouteLoaderData } from "react-router-dom";

const AboutWithdrawal = () => {
  const { minimumWithdraw, withdrawFee, withdrawTime } =
    useRouteLoaderData("configuration");

  return (
    <section>
      <h1 className="text-lg font-semibold text-center pt-2 mb-5">
        About Withdrawal
      </h1>
      <p className="bg-mySecondary p-3 rounded-md">
        The minimum withdrawal amount is {minimumWithdraw} USDT, the withdrawal
        fee is {withdrawFee}% of the withdrawal amount, the platform&apos;s
        withdrawal time is &apos;t+1&apos; mode, the number of withdrawals 1
        time/day, the withdrawal time is {withdrawTime} time every day.
      </p>
    </section>
  );
};
export default AboutWithdrawal;
