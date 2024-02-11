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
  const listStyle = "p-2 border-b-2";
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
        <section className="bg-mySecondary w-full mb-5 rounded">
            <p className={"text-center "+listStyle}>
              Current Configuration
            </p>
            <p className={"overflow-x-auto "+listStyle} >
              <span>Transfer Address:  </span>
              <span>{configuration.transferAddress}</span>
            </p>
            <p className={listStyle} >
              <span>Minimum Recharge:  </span>
              <span>${configuration.minimumRecharge}</span>
            </p>
            <p className={listStyle} >
              <span>Minimum Withdraw:  </span>
              <span>${configuration.minimumWithdraw}</span>
            </p>
            <p className={listStyle} >
              <span>Withdraw Fee:  </span>
              <span>${configuration.withdrawFee}</span>
            </p>
            <p className={listStyle} >
              <span>Trade Per Day:  </span>
              <span>{configuration.orderPerDay} times</span>
            </p>
            <p className={listStyle} >
              <span>Monthly Profit:  </span>
              <span>{configuration.monthlyProfit}%</span>
            </p>
            <p className={listStyle} >
              <span>Level 1 Commission:  </span>
              <span>{configuration.level1Commission}%</span>
            </p>
            <p className={listStyle} >
              <span>Level 2 Commission:  </span>
              <span>{configuration.level2Commission}%</span>
            </p>
            <p className={listStyle} >
              <span>Level 3 Commission:  </span>
              <span>{configuration.level3Commission}%</span>
            </p>
        </section>
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
            placeholder="Trade Per Day"
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
