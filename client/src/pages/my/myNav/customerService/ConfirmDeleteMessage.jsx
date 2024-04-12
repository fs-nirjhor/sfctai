import { toast } from "react-toastify";
import { useState } from "react";
import UseChat from "./UseChat";

const ConfirmDeleteMessage = ({ user, messageId, chatId }) => {
  const [processing, setProcessing] = useState(false);
  const { deleteMessage } = UseChat();

  const handleDelete = async () => {
    event.preventDefault();
    try {
      const data = {
        isAdmin: user?.isAdmin,
        messageId: messageId,
        chatId: chatId,
      };
      await deleteMessage(data);
      document.getElementById("message_delete_dialog").close();
    } catch (err) {
      document.getElementById("message_delete_dialog").close();
      if (err.response?.data.message) {
        toast.error(err.response.data.message); // error sent by server
      } else {
        toast.error(err.message); // other error
      }
    }
  };

  return (
    <dialog id="message_delete_dialog" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <figure>
          <p className="mb-5 text-center">
            Do you want to delete this message?
          </p>
          <button
            className={`btn ms-auto block btn-myPrimary bg-myPrimary text-white ${
              processing && "btn-disabled"
            }`}
            onClick={handleDelete}
          >
            {processing ? "Deleting..." : "Confirm"}
          </button>
        </figure>
      </div>
    </dialog>
  );
};
export default ConfirmDeleteMessage;
