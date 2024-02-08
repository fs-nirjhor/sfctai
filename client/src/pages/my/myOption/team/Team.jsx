import Chart from "./Chart";
import TeamLevel from "./TeamLevel";

const Team = () => {
  return (
    <section className="pb-20">
      <h1 className="text-lg font-semibold text-center pt-2 mb-5">Team</h1>
      <Chart />
      <TeamLevel />
    </section>
  );
};
export default Team;
