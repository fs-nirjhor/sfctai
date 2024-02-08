import SendBox from "./SendBox";
import ShowMessages from "./ShowMessages";

const Chat = () => {
  
  return (
    <>
    <div className="overflow-hidden">
      <ShowMessages/>
      <SendBox />
    </div>
    </>
  );
};

export default Chat;
