import QRCode from "react-qr-code";
import { useRouteLoaderData } from "react-router-dom";
import { serverUrl } from "../../../configuration/config";

const Invitation = () => {
  const user = useRouteLoaderData("user");
  const { level1Commission, level2Commission, level3Commission } =
    useRouteLoaderData("configuration");

  const invitationLink = `${serverUrl}/registration?invitationCode=${user.invitationCode}`;

  return (
    <section className="pb-20 px-2">
      <h1 className="font-semibold text-center pt-2 mb-5">Invite</h1>
      <article className="bg-mySecondary px-3 py-5 rounded-md mb-2">
        <h5>Invitation code</h5>
        <QRCode value={user.invitationCode} className="mx-auto my-10" />
      </article>
      <article className="bg-mySecondary px-3 py-5 rounded-md mb-2">
        <h5>Invitation link</h5>
        <div className="grid grid-cols-5 gap-2 mt-2">
          <p className="md:pt-2 font-semibold text-center col-span-4 break-all">
            {invitationLink}
          </p>
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => navigator.clipboard.writeText(invitationLink)}
          >
            Copy
          </button>
        </div>
      </article>
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
          Level 1 team members receive {level1Commission}% of the proceeds of
          their orders as your team commission.
        </li>
        <li>
          Level 2 team members receive {level2Commission}% of the proceeds of
          their orders as your team commission.
        </li>
        <li>
          Level 3 team members receive {level3Commission}% of the proceeds of
          their orders as your team commission.
        </li>
      </div>
    </section>
  );
};
export default Invitation;
