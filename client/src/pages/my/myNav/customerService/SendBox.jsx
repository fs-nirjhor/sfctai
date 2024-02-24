import { useParams, useRouteLoaderData } from "react-router-dom";
import InputEmoji from "react-input-emoji";
import { FaImage } from "react-icons/fa";
import UseChat from "./UseChat";
import { useState } from "react";
import { toast } from "react-toastify";

const SendBox = () => {
  const { sendMessage, page } = UseChat();
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const user = useRouteLoaderData("user");
  const { client } = useParams();
  const clientId = client || user._id;

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
          page: page,
          limit: 10,
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
            className={`btn btn-sm text-primary w-2/12 ${
              image && "bg-primary text-white"
            } rounded-none join-item p-2`}
          >
            <FaImage />
            <input
              className="hidden"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <div className="input input-sm join-item w-full p-0 border-primary">
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
        <button className="btn btn-sm btn-primary mt-1 ms-auto block px-10">
          SEND
        </button>
      </form>
    </div>
  );
};
export default SendBox;
