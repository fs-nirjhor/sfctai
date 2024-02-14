import { useState, useEffect } from "react";
import Loading from "./../shared/Loading";
import { coincapApi } from "../../data/config";
import { toast } from "react-toastify";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCoins = async () => {
      try {
        const response = await fetch(
          `https://api.coincap.io/v2/assets?limit=10&apiKey=${coincapApi}`
        );
        const data = await response.json();
        setCoins(data.data);
        setLoading(false);
      } catch (err) {
        toast.error(err.message);
      }
    };
    getCoins(); // get all coins

    // update in every 5 seconds
    const intervalId = setInterval(getCoins, 5000);

    // Clean up the interval
    return () => clearInterval(intervalId);
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <figure className="mt-2">
      <table className="table text-center font-semibold">
        <tbody>
          {coins.map((coin) => {
            const symbol = coin.symbol;
            const priceUsd = Number(coin.priceUsd).toFixed(2);
            const changePercent24Hr = Number(coin.changePercent24Hr).toFixed(2);
            const image = `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`;
            return (
              <tr key={symbol}>
                <td>
                  <div className="avatar w-12 h-12">
                    <img src={image} alt={symbol} />
                  </div>
                </td>
                <td className="font-bold">{symbol}</td>
                <td>{priceUsd}</td>
                <td
                  className={`${
                    changePercent24Hr > 0 ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {changePercent24Hr}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </figure>
  );
};
export default Coins;
