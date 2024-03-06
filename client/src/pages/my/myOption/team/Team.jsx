import { useLocation,  useRouteLoaderData } from "react-router-dom";
import Chart from "./Chart";
import TeamLevel from "./TeamLevel";

const Team = () => {
  const loggedUser = useRouteLoaderData("user");
  const {state} = useLocation();
  const user = state || loggedUser

  return (
    <section className="pb-20 px-2">
      <h1 className="font-semibold text-center pt-2 mb-5">{state ? `${state?.name}'s team` : "Team"}</h1>
      <Chart user={user}/>
      <TeamLevel user={user}/>
    </section>
  );
};
export default Team;
