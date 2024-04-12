import { useNavigate } from "react-router-dom";
import moment from "moment";
import { RiDeleteBin2Line } from "react-icons/ri";
import ConfirmDeleteMessage from "./ConfirmDeleteMessage";

const ShowMessages = ({ chats, user }) => {
  const navigate = useNavigate();

  const handleNavigation = (userId) => {
    event.preventDefault();
    if (user.isAdmin) {
      navigate(`/client/${userId}`);
    }
  };

  const handleDelete = async () => {
    event.preventDefault();
    document.getElementById("message_delete_dialog").showModal();
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
    <div className="w-full overflow-y-auto no-scrollbar flex flex-col-reverse flex-1 px-3">
      {chats.messages
        .slice()
        .reverse()
        .map((message, i) => {
          const ownMessage = message.sender?._id == user._id;
          const messageStyle = ownMessage
            ? "text-end ms-auto"
            : "text-start me-auto";
          const contentStyle = ownMessage
            ? "bg-myPrimary text-white"
            : "bg-white border border-myPrimary";
          const time = moment(message.time).format("DD/MM/YYYY HH:mm:ss");

          return (
            <div
              key={i}
              className={`flex items-center gap-3 ${
                ownMessage ? "flex-row-reverse" : "flex-row"
              } `}
            >
              {message.sender?.isAdmin && (
                <figure className="flex-none">
                  <img src="/images/icon.png" alt="aftaai" className="w-10" />
                </figure>
              )}
              <div className={`mt-2 ${messageStyle}`}>
                {message.text ? (
                  <span
                    className={`max-w-md inline-block text-left rounded px-3 py-1 ${contentStyle}`}
                    onClick={() => handleNavigation(message.sender?._id)}
                  >
                    {message.text}
                  </span>
                ) : (
                  <img
                    src={message.image}
                    alt="image"
                    className={`max-w-xs p-3 ${messageStyle}`}
                    onClick={() => handleNavigation(message.sender?._id)}
                  />
                )}
                <div
                  className={`flex gap-2 mt-1 justify-end ${
                    ownMessage ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <span className="text-xs text-gray-400">{time}</span>
                  <RiDeleteBin2Line
                    className={`text-red-600 text-lg ${
                      !user?.isAdmin && "hidden"
                    }`}
                    onClick={handleDelete}
                  />
                </div>
                <ConfirmDeleteMessage
                  messageId={message?._id}
                  chatId={chats?._id}
                  user={user}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ShowMessages;
