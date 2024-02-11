import UseChat from "./UseChat";
import Chat from "./Chat";

function CustomerService() {
  const { chats } = UseChat();
  return (
    <div>
      <h1 className="text-lg font-semibold text-center pt-2 mb-5">
        Customer Service
      </h1>
      <Chat chats={chats} />
    </div>
  );
}

export default CustomerService;
