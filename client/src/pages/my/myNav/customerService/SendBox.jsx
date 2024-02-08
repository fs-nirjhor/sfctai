import { useParams, useRouteLoaderData } from "react-router-dom";
import InputEmoji from 'react-input-emoji'
import {  MdSend } from "react-icons/md";
import { FaImage } from "react-icons/fa";
import UseChat from "./UseChat";
import { useState } from "react";
import AlertBox from "../../../shared/AlertBox";

const SendBox = () => {
  const { sendMessage } = UseChat();
  const [error, setError] = useState("");
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
      };
      await sendMessage(messageData);
      setText("");
      setImage(null);
    }
    } catch (err) {
      if (err.response?.data.message) {
        setError(err.response.data.message); // error sent by server
      } else {
        setError(err.message); // other error
      }
      document.getElementById("send-message-error").showModal();
    }
  };
  return (
    <div className="pt-5">
      <form className="  mx-auto" onSubmit={handleSubmit}>
        <div className="join w-full">
      <label className={`btn text-lg text-myPrimary w-2/12 ${image && "bg-myPrimary text-white"} rounded-none join-item p-2`}>
          <FaImage />
          <input
            className="hidden"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>
        <div className="input input-bordered join-item w-full bg-white p-0">
        <InputEmoji
          placeholder="Type Here..."
          value={text}
          onChange={setText}
          borderRadius={5}
          borderColor="white"
        />
          </div>
          </div>
        <button className="btn btn-warning bg-myPrimary text-white mt-2 ms-auto block px-10">
         SEND
        </button>
      </form>
      <AlertBox id="send-message-error" text={error} alertType="alert-error" />
    </div>
  );
};
export default SendBox;
