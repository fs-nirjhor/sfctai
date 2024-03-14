import { useRouteLoaderData } from "react-router-dom";

const AboutTeam = () => {
  const configuration =
    useRouteLoaderData("configuration");

  return (
    <section className="px-2">
      <h1 className="font-semibold text-center pt-2 mb-5">About Team</h1>
      <div className="bg-mySecondary p-3 rounded-md">
        <p className="mb-1">
          Use the exclusive invitation link in your account to invite your
          friends to join. When someone successfully registers an account
          through your invitation link, then he/she is a level 1 member of your
          team. Users who register through the invitation link of a level 1
          member of your team are a level 2 member of your team. A user who
          signs up through the invitation link of a Level 2 member of your team
          is a Level 3 member of your team. Each account can earn three
          different levels of team commissions.
        </p>
        <li>
          Level 1 team members receive {configuration?.level1Commission}% of the proceeds of
          their orders as your team commission.
        </li>
        <li>
          Level 2 team members receive {configuration?.level2Commission}% of the proceeds of
          their orders as your team commission.
        </li>
        <li>
          Level 3 team members receive {configuration?.level3Commission}% of the proceeds of
          their orders as your team commission.
        </li>
      </div>
    </section>
  );
};
export default AboutTeam;
