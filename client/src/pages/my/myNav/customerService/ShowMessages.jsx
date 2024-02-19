import { useNavigate, useParams, useRouteLoaderData } from "react-router-dom";
import UseChat from "./UseChat";
import moment from "moment";

const ShowMessages = () => {
  const user = useRouteLoaderData("user");
  const navigate = useNavigate()
  const { chats } = UseChat();
  const { client } = useParams();
  const clientId = client || user._id;
  const handleClick = (userId) => {
    event.preventDefault();
    if (user.isAdmin) {
      navigate(`/client/${userId}`);
    }
  };

  if (!chats || !chats.length) {
    return (
      <div className="w-full">
        <p className="text-center my-40">Start conversation</p>
      </div>
    );
  }
  return (
    <div className="w-full overflow-y-auto no-scrollbar flex flex-col-reverse px-3">
      {chats.map((chat) => {
        if (chat.client && chat.client?._id == clientId) {
          return chat.messages
            .slice()
            .reverse()
            .map((message, i) => {
              const messageStyle =
              message.sender == user._id ? "text-end ms-auto"
                  : "text-start me-auto";
              const contentStyle =
              message.sender == user._id ? "bg-primary text-white"
                  : "bg-white border border-primary";
              const time = moment(message.time).format("DD/MM/YYYY HH:mm:ss");
              const name = message.sender == user._id ? user.name : chat.client?.name;
              const avatar = message.sender == user._id ? user.avatar : chat.client?.avatar;
              return (
                <div
                  key={i}
                  className={`flex items-center gap-3 ${
                    message.sender == user._id ? "flex-row-reverse"
                      : "flex-row"
                  } `}
                  
                >
                  <figure onClick={() => handleClick(message.sender)} className="flex-none">
                    <img
                      src={avatar}
                      alt={name}
                      className="w-10"
                    />
                  </figure>
                  <div className={`mt-2 ${messageStyle}`}>
                    {message.text ? (
                      <span
                        className={`max-w-md inline-block rounded-md px-3 py-1 ${contentStyle}`}
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
                    <p className="text-xs text-gray-100">{time}</p>
                  </div>
                </div>
              );
            });
        }
      })}
    </div>
  );
};

export default ShowMessages;
