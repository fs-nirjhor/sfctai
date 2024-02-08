import { useRouteLoaderData } from "react-router-dom";
import ConversationList from "./ChatList";
import UseChat from "./UseChat";
import Chat from "./Chat";

function CustomerService() {
  const user = useRouteLoaderData("user");
  const { chats } = UseChat();
  return (
    <div>
      <h1 className="text-lg font-semibold text-center pt-2 mb-5">
        Customer Service
      </h1>
      {/* <ConversationList /> */}
      <Chat chats={chats} />
    </div>
  );
}

export default CustomerService;
