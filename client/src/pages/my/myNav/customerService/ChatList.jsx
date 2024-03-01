import { Link } from "react-router-dom";
import UseChat from "./UseChat";
import Loading from "../../../shared/Loading";
import Pagination from "../../../shared/Pagination";

const ChatList = () => {
  const { chatlist, pagination, page, setPage } = UseChat();

  return !chatlist.length ? (
    <Loading />
  ) : (
    <div className="pb-20">
      <section className="sticky top-0 bg-myBg pb-3">
        <h1 className="font-semibold text-center pt-2 mb-5">Chat List</h1>
        <Pagination page={page} setPage={setPage} pagination={pagination} />
      </section>
      <div className="rounded">
        {chatlist.map((chat, i) => {
          const lastMessages = chat.messages?.length - 1;
          return (
            <Link
              to={chat.client?._id}
              className={`flex justify-start gap-5 p-3 mb-2 rounded text-black hover:bg-myPrimary ${
                chat.isSeen ? "bg-white" : "bg-gray-400"
              }`}
              key={i}
              >
              <figure>
                <img
                  src={chat.client?.avatar}
                  alt={chat.client?.name}
                  className="w-10"
                />
              </figure>
              <div>
                <p>{chat.client?.name}</p>
                <p
                  className={`text-sm ${
                    chat.isSeen ? "text-gray-400" : "text-white"
                  }`}
                >
                  {chat.messages[lastMessages]?.text}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default ChatList;
