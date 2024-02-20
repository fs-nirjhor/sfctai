import SendBox from "./SendBox";
import ShowMessages from "./ShowMessages";

const Chat = () => {
  return (
          <div className="flex flex-col justify-between w-full max-w-md mx-auto h-[calc(100vh-8rem)] sm:h-[calc(100vh-7rem)] md:h-[calc(100vh-6rem)] lg:h-[calc(100vh-5rem)] p-2">
            <h1 className="font-semibold text-center h1 pb-2">Customer Service</h1>
            <ShowMessages />
            <SendBox />
          </div>
  );
};

export default Chat;