import {useEffect, useState, useRef} from "react";
import { useRouteLoaderData } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { serverUrl } from "../../../../data/config";

const UseChat = () => {
  const user = useRouteLoaderData("user")
  const socketRef = useRef();
  const [chats, setChats] = useState([]);
  
  useEffect(() =>{
    socketRef.current = socketIOClient(serverUrl);
    const data = {isAdmin: user.isAdmin, id: user._id}

      socketRef.current.emit("chats", data);

      socketRef.current.on("chats", (newChat) =>{
      setChats(newChat);
    });
    
    socketRef.current.on("message",(newMessage) =>{
      setChats(newMessage);
    })

    socketRef.current.on("seen",(newMessage) =>{
      setChats(newMessage);
    })

    return ()=>{
      socketRef.current.disconnect();
    }
  },[user]);

  // sending  
  const sendMessage = (newMessage) =>{
    socketRef.current.emit("message", newMessage)
  }

  const seenMessage = (data) =>{
    socketRef.current.emit("seen", data)
  }

  return {chats, sendMessage, seenMessage};
}

export default UseChat;