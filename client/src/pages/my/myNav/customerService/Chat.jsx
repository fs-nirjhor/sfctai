import { useNavigate } from "react-router-dom";
import SendBox from "./SendBox";
import ShowMessages from "./ShowMessages";
import { VscChromeClose } from "react-icons/vsc";

const Chat = () => {
  const navigate = useNavigate()
  return (
          <div className="flex flex-col justify-between w-full h-[calc(100vh-8rem)] sm:h-[calc(100vh-7rem)] md:h-[calc(100vh-6rem)] lg:h-[calc(100vh-5rem)] p-2 max-w-md rounded-md shadow-md mx-auto bg-white">
          <div className="pb-2 inline-flex justify-between">
            <span></span>
            <h1 className="font-semibold text-center h1">Customer Service</h1>
            <span className="text-end" onClick={() => navigate(-1)}><VscChromeClose /></span>
          </div>
            <ShowMessages />
            <SendBox />
          </div>
  );
};

export default Chat;