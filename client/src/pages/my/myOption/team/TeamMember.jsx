import moment from "moment";

const TeamMember = ({ levelId, user }) => {
  const level = "level" + levelId;
  return (
    <article className="mt-5">
      {!user.team[level].length ? (
        <h1 className="text-center mt-10 text-xl">No Members</h1>
      ) : (
        user.team[level].map((member) => {
          const formattedDate = moment(member.createdAt).format(
            "DD/MM/YYYY HH:mm:ss"
          );
          return (
            <div
              className="card card-side bg-mySecondary px-2 mb-2 text-start"
              key={member._id}
            >
              <figure className="avatar">
                <div className="h-14 p-2">
                  <img src="/images/avatar/teamAvatar.png" alt="avatar" />
                </div>
              </figure>
              <div className="card-body py-3">
                <p className="flex">
                  <span className="me-3">ID: {member.userId}</span>
                  <span
                    className={
                      member.transaction?.balance >= 10 ||
                      member.transaction?.isOrderPending
                        ? "text-myPrimary"
                        : ""
                    }
                  >
                    Name: {member.name}
                  </span>
                </p>
                <p className="text-gray-400 text-sm">
                  Join time: {formattedDate}
                </p>
              </div>
            </div>
          );
        })
      )}
    </article>
  );
};
export default TeamMember;
