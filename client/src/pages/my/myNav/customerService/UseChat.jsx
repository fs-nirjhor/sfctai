import { useEffect, useState, useRef } from "react";
import { useParams, useRouteLoaderData } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { serverUrl } from "../../../../configuration/config";

const UseChat = () => {
  const user = useRouteLoaderData("user");
  const socketRef = useRef();
  const { client } = useParams();
  const [chats, setChats] = useState([]);
  const [chatlist, setChatlist] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  //console.log(page);
  useEffect(() => {
    socketRef.current = socketIOClient(serverUrl);
    const filter = {
      isAdmin: user.isAdmin,
      id: client || user._id,
      page: page,
      limit: 10,
    };

    socketRef.current.emit("chats", filter);

    socketRef.current.on("chats", (data) => {
      setChats(data.chats);
      setChatlist(data.chatlist);
      setPagination(data.pagination);
    });

    socketRef.current.on("message", (data) => {
      setChats(data.chats);
      setChatlist(data.chatlist);
    });

    socketRef.current.on("seen", (newMessage) => {
      setChatlist(newMessage);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [user, client, page]);

  const sendMessage = (newMessage) => {
    newMessage.page = page;
    newMessage.limit = 10;
    socketRef.current.emit("message", newMessage);
  };

  return {
    chats,
    chatlist,
    page,
    pagination,
    sendMessage,
    setPage,
  };
};

export default UseChat;
