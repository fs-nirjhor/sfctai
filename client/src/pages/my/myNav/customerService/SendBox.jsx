import InputEmoji from "react-input-emoji";
import { FaImage } from "react-icons/fa";
import UseChat from "./UseChat";
import { useState } from "react";
import { toast } from "react-toastify";

const SendBox = ({ clientId, user }) => {
  const { sendMessage } = UseChat();
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async () => {
    event.preventDefault();
    try {
      if (text || image) {
        const messageData = {
          isAdmin: user.isAdmin,
          text: text,
          image: image,
          sender: user._id,
          client: clientId,
        };
        await sendMessage(messageData);
        setText("");
        setImage(null);
      }
    } catch (err) {
      if (err.response?.data.message) {
        toast.error(err.response.data.message); // error sent by server
      } else {
        toast.error(err.message); // other error
      }
    }
  };

  return (
    <div className="pt-2">
      <form className="mx-auto" onSubmit={handleSubmit}>
        <div className="join p-0 m-0 w-full">
          <label
            className={`btn btn-sm text-myPrimary ${
              image && "bg-myPrimary text-white"
            } rounded-none join-item py-2 px-5`}
          >
            <FaImage />
            <input
              className="hidden"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <div className="flex-1 input input-sm join-item w-full p-0 border-myPrimary">
            <InputEmoji
              placeholder="Type Here..."
              inputClass="h-5"
              value={text}
              onChange={setText}
              borderRadius={5}
              borderColor="white"
              fontSize={15}
              keepOpened={true}
              shouldReturn={false}
              //tabIndex={5}
              //height={40}
            />
          </div>
        </div>
        <button className="btn btn-sm btn-myPrimary mt-2 ms-auto block px-10">
          SEND
        </button>
      </form>
    </div>
  );
};
export default SendBox;
