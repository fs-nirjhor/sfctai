import { useParams, useRouteLoaderData } from "react-router-dom";
import UseChat from "./UseChat";
import moment from "moment";
import SendBox from './SendBox';

const ShowMessages = () => {
  const user = useRouteLoaderData("user");
  const { chats } = UseChat();
  const { client } = useParams();
  const clientId = client || user._id;

  if (!chats) {
    return (
      <div className="h-[59vh]">
        <h1 className="font-semibold text-center pt-2 mb-5">Chat</h1>
        <p className="text-center my-40">Start conversation</p>
      </div>
    );
  }
  return (
      <div className="w-full xh-[59vh] h-96 overflow-y-auto no-scrollbar flex flex-col-reverse px-3">
        {chats.map((chat) => {
          if (chat.client && chat.client?._id == clientId) {
            return chat.messages
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
                    : "bg-white text-myPrimary border border-myPrimary";
                const time = moment(message.time).format("DD/MM/YYYY HH:mm:ss");
                return (
                  <div key={i}>
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
                          className={`w-2/3 p-3 ${messageStyle}`}
                        />
                      )}
                      <p className="text-xs text-gray-400">{time}</p>
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
