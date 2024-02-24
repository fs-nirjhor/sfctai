import { useEffect, useState, useRef } from "react";
import { useRouteLoaderData } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { serverUrl } from "../../../../data/config";

const UseChat = () => {
  const user = useRouteLoaderData("user");
  const socketRef = useRef();
  const [chats, setChats] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  console.log(page)
  useEffect(() => {
    socketRef.current = socketIOClient(serverUrl);
    const filter = {
      isAdmin: user.isAdmin,
      id: user._id,
      page: page,
      limit: 10,
    };

    socketRef.current.emit("chats", filter);

    socketRef.current.on("chats", (data) => {
      setChats(data.chats);
      setPagination(data.pagination);
    });

    socketRef.current.on("message", (newMessage) => {
      setChats(newMessage);
    });

    socketRef.current.on("seen", (newMessage) => {
      setChats(newMessage);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [user, page]);

  // sending
  const sendMessage = (newMessage) => {
    newMessage.page = page;
    newMessage.limit = 10;
    socketRef.current.emit("message", newMessage);
  };

  const seenMessage = (data) => {
    data.page = page;
    data.limit = 10;
    socketRef.current.emit("seen", data);
  };

  return { chats, sendMessage, seenMessage, pagination, page, setPage };
};

export default UseChat;
