import { useNavigate } from "react-router-dom";
import SendBox from "./SendBox";
import ShowMessages from "./ShowMessages";
import { VscChromeClose } from "react-icons/vsc";

const Chat = () => {
  const navigate = useNavigate()
  return (
      <div>
        <dialog
          className="max-w-md rounded-md shadow-md mx-auto modal bg-white"
          open
        >
          <div className="flex flex-col justify-between w-full h-screen p-2">
          <div className="pb-2 inline-flex justify-between">
            <span></span>
            <h1 className="font-semibold text-center h1">Customer Service</h1>
            <span className="text-end" onClick={() => navigate(-1)}><VscChromeClose /></span>
          </div>
            <ShowMessages />
            <SendBox />
          </div>
        </dialog>
      </div>
  );
};

export default Chat;