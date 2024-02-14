import { useRouteLoaderData } from "react-router-dom";

const Chart = ({user}) => {
  const configuration = useRouteLoaderData("configuration");
  const { transaction, team } = user;
  console.log(user)
  // functions
  const countActiveMembers = (level) => {
    let activeMembersCount = 0;
    team[level].forEach((member) => {
      if (member.transaction?.balance >= 10 || member.transaction?.isOrderPending) {
        activeMembersCount++;
      }
    });
    return activeMembersCount;
  };
  const countTeamTotal = (level, type) => {
    const totalIncome = team[level].reduce(
      (amount, member) => amount + member.transaction[type],
      0
    );
    return Number(totalIncome);
  };

  // total
  const totalIncome = transaction.totalTeamIncome;
  const todaysTeamIncome = transaction.todaysTeamIncome;

  // direct membership data
  const directIncome =
    countTeamTotal("level1", "totalIncome") *
    (Number(configuration.level1Commission) / 100);
  const directRecharge = countTeamTotal("level1", "totalRecharge");
  const directTotalMembers = team.level1.length;
  const directActiveMembers = countActiveMembers("level1");

  // team membership data
  const teamRecharge =
    countTeamTotal("level1", "totalRecharge") +
    countTeamTotal("level2", "totalRecharge") +
    countTeamTotal("level3", "totalRecharge");

  const teamTotalMembers =
    team.level1.length + team.level2.length + team.level3.length;

  const teamActiveMembers =
    countActiveMembers("level1") +
    countActiveMembers("level2") +
    countActiveMembers("level3");

  // chart data
  const charts = [
    {
      name: "Direct Membership",
      recharge: directRecharge,
      income: directIncome,
      totalMembers: directTotalMembers,
      activeMembers: directActiveMembers,
    },
    {
      name: "Team Membership",
      recharge: teamRecharge,
      income: totalIncome,
      totalMembers: teamTotalMembers,
      activeMembers: teamActiveMembers,
    },
  ];

  return (
    <section className="text-center mb-3">
      <div className="flex justify-evenly mb-2">
        <div>
      <h4 className="text-sm">Total Income</h4>
      <h2 className="font-lg font-semibold mb-2">
        USDT {totalIncome.toFixed(2)}
      </h2>
        </div>
        <div>
      <h4 className="text-sm">Todays Income</h4>
      <h2 className="font-lg font-semibold mb-2">
        USDT {todaysTeamIncome.toFixed(2)}
      </h2>
        </div>
      </div>
      {charts.map((chart, i) => (
        <figure className="bg-mySecondary rounded-md px-3 py-5 mb-2" key={i}>
          <h3 className="mb-3">{chart.name}</h3>
          <table className="table table-xs text-center">
            <tbody>
              <tr>
                <td>Recharge Amount</td>
                <td>Income</td>
                <td>Number of members</td>
                <td>Active members</td>
              </tr>
              <tr>
                <td>{chart.recharge.toFixed(2)}</td>
                <td>{chart.income.toFixed(2)}</td>
                <td>{chart.totalMembers}</td>
                <td>{chart.activeMembers}</td>
              </tr>
            </tbody>
          </table>
        </figure>
      ))}
    </section>
  );
};

export default Chart;
