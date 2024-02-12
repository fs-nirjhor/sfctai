import { useLocation, useParams, useRouteLoaderData } from "react-router-dom";
import Chart from "./Chart";
import TeamLevel from "./TeamLevel";

const Team = () => {
  const user = useRouteLoaderData("user");
  //const {state} = useLocation();
  const state = user;
  console.log(state)

  return (
    <section className="pb-20">
      <h1 className="font-semibold text-center pt-2 mb-5">Team</h1>
      <Chart user={state || user}/>
      <TeamLevel user={state || user}/>
    </section>
  );
};
export default Team;
