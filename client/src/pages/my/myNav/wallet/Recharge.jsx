import QRCode from "react-qr-code";
import { Link, useRouteLoaderData } from "react-router-dom";

const Recharge = () => {
  const { minimumRecharge, transferAddress } = useRouteLoaderData("configuration");
  return (
    <section className="pb-20">
      <h1 className="text-lg font-semibold text-center mt-2 mb-5">Recharge</h1>
      <figure className="bg-mySecondary rounded-md px-3 py-5">
        <div className="grid grid-cols-7 gap-2">
          <p className="md:pt-2 font-semibold text-center text-sm col-span-2">
            Transfer Address
          </p>
          <p className="md:pt-2 font-semibold text-center text-sm col-span-4 break-all">
            {transferAddress}
          </p>
          <button
            className="btn btn-sm btn-warning bg-myPrimary text-white"
            onClick={() => navigator.clipboard.writeText(transferAddress)}
          >
            Copy
          </button>
        </div>
        <QRCode value={transferAddress} className="mx-auto my-10" />
        <p>
          The minimum value of recharge is {minimumRecharge} USDT, only USDT is
          supported for recharge, the funds will not be returned and the user
          will bear the loss.
        </p>
        <p className="mt-2">
          Don&apos;t forget to collect & submit the txid after recharge.
        </p>
        <Link
          to="/my/txid-authentication"
          className="btn btn-warning btn-block bg-myPrimary text-white mt-3 hover:text-white"
        >
          SUBMIT TXID
        </Link>
      </figure>
    </section>
  );
};
export default Recharge;
