import { useState } from "react";
import AlertBox from "../../../shared/AlertBox";
import { useRouteLoaderData } from "react-router-dom";
import { configurationApi } from "../../../../router/axiosApi";

const SetConfiguration = () => {
  const configuration = useRouteLoaderData("configuration");
  const [error, setError] = useState("");
  // updates
  const [transferAddress, setTransferAddress] = useState("");
  const [minimumRecharge, setMinimumRecharge] = useState("");
  const [minimumWithdraw, setMinimumWithdraw] = useState("");
  const [withdrawFee, setWithdrawFee] = useState("");
  const [monthlyProfit, setMonthlyProfit] = useState("");
  const [orderPerDay, setOrderPerDay] = useState("");
  const [level1Commission, setLevel1Commission] = useState("");
  const [level2Commission, setLevel2Commission] = useState("");
  const [level3Commission, setLevel3Commission] = useState("");

  //console.log(configuration)
  const handleClick = async (update) => {
    event.preventDefault();
    try {
      /* const seed = await axios.post('http://localhost:3001/api/seed/configuration')
      console.log(seed); */
      const res = await configurationApi.put(configuration._id, { update });
      res.data?.success &&
        document.getElementById("update-success").showModal();
      window.location.reload();
    } catch (err) {
      if (err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError(err.message);
      }
      document.getElementById("configuration-error").showModal();
    }
  };

  const inputStyle =
    "input input-bordered input-sm border-myPrimary join-item w-4/6";
  const formStyle = "join shadow-md w-full mb-4";
  const buttonStyle =
    "btn btn-sm btn-warning bg-myPrimary text-white join-item w-2/6";

  return (
    <div>
      <h1 className="text-lg font-semibold text-center pt-2 mb-5">
        Configuration
      </h1>
      <div>
        <table className="table border-collapse table-auto bg-mySecondary w-full mb-5">
          <thead>
            <th colSpan={2} className="text-center">
              Current Configuration
            </th>
          </thead>
          <tbody>
            <tr>
              <td>Transfer Address</td>
              <td>{configuration.transferAddress}</td>
            </tr>
            <tr>
              <td>Minimum Recharge</td>
              <td>${configuration.minimumRecharge}</td>
            </tr>
            <tr>
              <td>Minimum Withdraw</td>
              <td>${configuration.minimumWithdraw}</td>
            </tr>
            <tr>
              <td>Withdraw Fee</td>
              <td>${configuration.withdrawFee}</td>
            </tr>
            <tr>
              <td>Order Per Day</td>
              <td>{configuration.orderPerDay} times</td>
            </tr>
            <tr>
              <td>Monthly Profit</td>
              <td>{configuration.monthlyProfit}%</td>
            </tr>
            <tr>
              <td>Level 1 Commission</td>
              <td>{configuration.level1Commission}%</td>
            </tr>
            <tr>
              <td>Level 2 Commission</td>
              <td>{configuration.level2Commission}%</td>
            </tr>
            <tr>
              <td>Level 3 Commission</td>
              <td>{configuration.level3Commission}%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="max-w-md mx-auto pb-20">
        <h3 className="text-center mb-3">Change Configuration</h3>
        <form
          className={formStyle}
          onSubmit={() => handleClick({ transferAddress })}
        >
          <input
            type="text"
            placeholder="Transfer Address"
            className={inputStyle}
            value={transferAddress}
            onChange={(e) => setTransferAddress(e.target.value)}
            required
          />
          <button type="submit" className={buttonStyle}>
            Update
          </button>
        </form>
        <form
          className={formStyle}
          onSubmit={() => handleClick({ minimumRecharge })}
        >
          <input
            type="number"
            placeholder="Minimum Recharge"
            className={inputStyle}
            value={minimumRecharge}
            onChange={(e) => setMinimumRecharge(e.target.value)}
            required
          />
          <button type="submit" className={buttonStyle}>
            Update
          </button>
        </form>
        <form
          className={formStyle}
          onSubmit={() => handleClick({ minimumWithdraw })}
        >
          <input
            type="number"
            placeholder="Minimum Withdraw"
            className={inputStyle}
            value={minimumWithdraw}
            onChange={(e) => setMinimumWithdraw(e.target.value)}
            required
          />
          <button type="submit" className={buttonStyle}>
            Update
          </button>
        </form>
        <form
          className={formStyle}
          onSubmit={() => handleClick({ withdrawFee })}
        >
          <input
            type="number"
            placeholder="Withdraw Fee (%)"
            className={inputStyle}
            value={withdrawFee}
            onChange={(e) => setWithdrawFee(e.target.value)}
            required
          />
          <button type="submit" className={buttonStyle}>
            Update
          </button>
        </form>
        <form
          className={formStyle}
          onSubmit={() => handleClick({ monthlyProfit })}
        >
          <input
            type="number"
            placeholder="Monthly Profit (%)"
            className={inputStyle}
            value={monthlyProfit}
            onChange={(e) => setMonthlyProfit(e.target.value)}
            required
          />
          <button type="submit" className={buttonStyle}>
            Update
          </button>
        </form>
        <form
          className={formStyle}
          onSubmit={() => handleClick({ orderPerDay })}
        >
          <input
            type="number"
            placeholder="Order Per Day"
            className={inputStyle}
            value={orderPerDay}
            onChange={(e) => setOrderPerDay(e.target.value)}
            required
          />
          <button type="submit" className={buttonStyle}>
            Update
          </button>
        </form>
        <form
          className={formStyle}
          onSubmit={() => handleClick({ level1Commission })}
        >
          <input
            type="number"
            placeholder="Level 1 commission (%)"
            className={inputStyle}
            value={level1Commission}
            onChange={(e) => setLevel1Commission(e.target.value)}
            required
          />
          <button type="submit" className={buttonStyle}>
            Update
          </button>
        </form>
        <form
          className={formStyle}
          onSubmit={() => handleClick({ level2Commission })}
        >
          <input
            type="number"
            placeholder="Level 2 commission (%)"
            className={inputStyle}
            value={level2Commission}
            onChange={(e) => setLevel2Commission(e.target.value)}
            required
          />
          <button type="submit" className={buttonStyle}>
            Update
          </button>
        </form>
        <form
          className={formStyle}
          onSubmit={() => handleClick({ level3Commission })}
        >
          <input
            type="number"
            placeholder="Level 3 commission (%)"
            className={inputStyle}
            value={level3Commission}
            onChange={(e) => setLevel3Commission(e.target.value)}
            required
          />
          <button type="submit" className={buttonStyle}>
            Update
          </button>
        </form>
      </div>
      <AlertBox id="configuration-error" text={error} alertType="alert-error" />
    </div>
  );
};
export default SetConfiguration;
