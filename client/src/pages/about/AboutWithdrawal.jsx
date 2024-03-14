import { useRouteLoaderData } from "react-router-dom";

const AboutWithdrawal = () => {
  const configuration =
    useRouteLoaderData("configuration");

  return (
    <section className="px-2">
      <h1 className="font-semibold text-center pt-2 mb-5">About Withdrawal</h1>
      <p className="bg-mySecondary p-3 rounded-md">
        The minimum withdrawal amount is {configuration?.minimumWithdraw} USDT, the withdrawal
        fee is {configuration?.withdrawFee}% of the withdrawal amount, the platform&apos;s
        withdrawal time is &apos;t+1&apos; mode, the number of withdrawals 1
        time/day, the withdrawal time is {configuration?.withdrawTime} time every day.
      </p>
    </section>
  );
};
export default AboutWithdrawal;
