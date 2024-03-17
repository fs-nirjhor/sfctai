import { useRouteLoaderData } from "react-router-dom";

const AboutWithdrawal = () => {
  const configuration = useRouteLoaderData("configuration");

  return (
    <section className="px-2">
      <h1 className="font-semibold text-center pt-2 mb-5">About Withdrawal</h1>
      <p className="bg-mySecondary p-3 rounded-md">
        The minimum withdrawal amount is {configuration?.minimumWithdraw || 6}{" "}
        USDT, the withdrawal fee is {configuration?.withdrawFee || 3}% of the
        withdrawal amount, the platform&apos;s withdrawal time is
        &apos;t+1&apos; mode, the number of withdrawals 1 time/day, the
        withdrawal time is 10:00-22:00 Saudi Arabia time every day.
      </p>
    </section>
  );
};
export default AboutWithdrawal;
