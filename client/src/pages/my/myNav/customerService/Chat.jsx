import SendBox from "./SendBox";
import ShowMessages from "./ShowMessages";

const Chat = () => {
  
  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 w-full px-2 mx-auto h-screen">
      <h1 className="font-semibold text-center py-2">Chat</h1>
      <div className="flex flex-col justify-end chatPage">
        <ShowMessages />
        <SendBox />
      </div>
    </div>
  );
};

export default Chat;
