import { useParams, useRouteLoaderData } from "react-router-dom";
import SendBox from "./SendBox";
import ShowMessages from "./ShowMessages";
import UseChat from "./UseChat";

const Chat = () => {
  const user = useRouteLoaderData("user");
  const { chats } = UseChat();
  const { client } = useParams();
  const clientId = client || user._id;
  return (
    <div className="flex flex-col justify-between w-full max-w-md mx-auto h-[calc(100vh-8rem)] sm:h-[calc(100vh-7rem)] md:h-[calc(100vh-6rem)] lg:h-[calc(100vh-5rem)] p-2 bg-white rounded-b-md shadow-md">
      <h1 className="font-semibold text-center h1 pb-2">
        {user.isAdmin ? chats?.client?.name : "Customer Service"}
      </h1>
      <ShowMessages chats={chats} user={user} />
      <SendBox clientId={clientId} user={user} />
    </div>
  );
};

export default Chat;
