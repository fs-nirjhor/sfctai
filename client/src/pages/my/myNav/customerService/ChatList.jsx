import { Link } from "react-router-dom";
import UseChat from "./UseChat";

const ChatList = () => {
    const {chats, seenMessage} = UseChat(); 
   
    return (
      <div className="pb-20">
        <h1 className="text-lg font-semibold text-center mt-2 mb-5">
        Chat List
      </h1>
        <div className="rounded">
      {chats.map((chat,i) => {
        const lastMessages = chat.messages?.length - 1;
        return (
          <Link to={chat.client?._id} className={`flex justify-start gap-5 p-3 border-b-2 border-b-mySecondary text-black hover:bg-myPrimary ${chat.isSeen ? "bg-white" : "bg-mySecondary"}`} key={i} onClick={async () => await seenMessage({isAdmin: chat.client?.isAdmin, client:chat.client?._id})}>
            <figure>
              <img src={chat.client?.avatar} alt={chat.client?.name} className="w-10"/>
            </figure>
            <div>
              <p>{chat.client?.name}</p>
              <p className="text-sm text-gray-400">{chat.messages[lastMessages]?.text}</p>
            </div>
          </Link>
        )
      })}
      </div>
    </div>
  )
}
export default ChatList