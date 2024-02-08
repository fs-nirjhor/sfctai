import { Link, useRouteLoaderData } from "react-router-dom";

const AboutRecharge = () => {
  const { minimumRecharge } = useRouteLoaderData("configuration");

  return (
    <section>
      <h1 className="text-lg font-semibold text-center pt-2 mb-5">
        About Recharge
      </h1>
      <div className="bg-mySecondary p-3 rounded-md">
        <p>
          The minimum value of recharge is {minimumRecharge} USDT, only USDT is
          supported for recharge, if you use other currencies for recharge, the
          funds will not be returned and the user will bear the loss.
        </p>
        <Link
          to="https://www.binance.com/en/support/faq/how-to-buy-cryptocurrency-via-p2p-trading-on-binance-lite-384c0a3441b04a9cbe97c9687ef86b60"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          How to buy cryptocurrencies in Binance?
        </Link>
        <Link
          to="https://www.binance.com/en/support/faq/how-to-sell-cryptocurrency-via-p2p-trading-on-binance-app-360039385091"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          How to sell cryptocurrency in Binance?
        </Link>
      </div>
    </section>
  );
};
export default AboutRecharge;
