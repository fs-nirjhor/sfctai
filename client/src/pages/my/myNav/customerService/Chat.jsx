import SendBox from "./SendBox";
import ShowMessages from "./ShowMessages";

const Chat = () => {
  
  return (
    <section className="h-[90rem]">
    <h1 className="font-semibold text-center pt-2 mb-5">Chat</h1>
    <div className="flex flex-col justify-end">
      <ShowMessages/>
      <SendBox />
    </div>
    </section>
  );
};

export default Chat;
