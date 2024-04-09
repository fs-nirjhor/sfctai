import { useNavigate } from "react-router-dom";
import moment from "moment";
import { RiDeleteBin2Line } from "react-icons/ri";
import UseChat from "./UseChat";
import { toast } from "react-toastify";

const ShowMessages = ({ chats, user }) => {
  const navigate = useNavigate();
  const { deleteMessage } = UseChat();

  const handleNavigation = (userId) => {
    event.preventDefault();
    if (user.isAdmin) {
      navigate(`/client/${userId}`);
    }
  };

  const handleDelete = async (messageId, chatId) => {
    event.preventDefault();
    try {
      const data = {
        isAdmin: user?.isAdmin,
        messageId: messageId,
        chatId: chatId,
      };
      await deleteMessage(data);
    } catch (err) {
      if (err.response?.data.message) {
        toast.error(err.response.data.message); // error sent by server
      } else {
        toast.error(err.message); // other error
      }
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
    <div className="w-full overflow-y-auto no-scrollbar flex flex-col-reverse flex-1 px-3">
      {chats.messages
        .slice()
        .reverse()
        .map((message, i) => {
          const ownMessage = message.sender == user._id;
          const adminMessage = message.sender !== chats?.client?._id;
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
              {adminMessage && (
                <figure className="flex-none">
                  <img src="/images/icon.png" alt="aftaai" className="w-10" />
                </figure>
              )}
              <div className={`mt-2 ${messageStyle}`}>
                {message.text ? (
                  <span
                    className={`max-w-md inline-block text-left rounded px-3 py-1 ${contentStyle}`}
                    onClick={() => handleNavigation(message.sender)}
                  >
                    {message.text}
                  </span>
                ) : (
                  <img
                    src={message.image}
                    alt="image"
                    className={`max-w-xs p-3 ${messageStyle}`}
                    onClick={() => handleNavigation(message.sender)}
                  />
                )}
                <div
                  className={`flex gap-2 mt-1 ${
                    ownMessage
                      ? "flex-row justify-end"
                      : "flex-row-reverse justify-start"
                  }`}
                >
                  <span className="text-sm text-gray-400">{time}</span>
                  <RiDeleteBin2Line
                    className="text-red-600 text-lg"
                    onClick={() => handleDelete(message?._id, chats?._id)}
                  />
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ShowMessages;
