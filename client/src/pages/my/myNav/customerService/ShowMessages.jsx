import { useNavigate } from "react-router-dom";
import moment from "moment";

const ShowMessages = ({ chats, user }) => {
  const navigate = useNavigate();

  const handleClick = (userId) => {
    event.preventDefault();
    if (user.isAdmin) {
      navigate(`/client/${userId}`);
    }
  };

  // handle empty chat page
  if (!chats?.messages?.length) {
    return (
      <div className="w-full">
        <p className="text-center my-40">Start conversation</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-y-auto no-scrollbar flex flex-col-reverse px-3">
      {chats.messages
        .slice()
        .reverse()
        .map((message, i) => {
          const messageStyle =
            message.sender == user._id
              ? "text-end ms-auto"
              : "text-start me-auto";
          const contentStyle =
            message.sender == user._id
              ? "bg-myPrimary text-white"
              : "bg-white border border-myPrimary";
          const time = moment(message.time).format("DD/MM/YYYY HH:mm:ss");
          const name =
            message.sender == user._id ? user.name : chats.client?.name;
          const avatar =
            message.sender == user._id ? user.avatar : chats.client?.avatar;
          return (
            <div
              key={i}
              className={`flex items-center gap-3 ${
                message.sender == user._id ? "flex-row-reverse" : "flex-row"
              } `}
              onClick={() => handleClick(message.sender)}
            >
              {chats?.client?._id !== message.sender && (
                <figure className="flex-none">
                  <img src="/images/icon.png" alt={name} className="w-10" />
                </figure>
              )}
              <div className={`mt-2 ${messageStyle}`}>
                {message.text ? (
                  <span
                    className={`max-w-md inline-block text-left rounded px-3 py-1 ${contentStyle}`}
                  >
                    {message.text}
                  </span>
                ) : (
                  <img
                    src={message.image}
                    alt="image"
                    className={`max-w-xs p-3 ${messageStyle}`}
                  />
                )}
                <p className="text-xs text-gray-400">{time}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ShowMessages;
