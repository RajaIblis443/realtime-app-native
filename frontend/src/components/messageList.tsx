import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";

export default function MessageList() {
  const { socket } = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  
  interface Message {
    content: string;
    sentAt: Date;
    from: string;
    id: string | null
  }
  useEffect(() => {
    if (!socket) return;
    socket.on("chat message", (data: Message) => {
      setMessages((prv) => [...prv, data]);
    })
    return () => {
      socket.off("chat message"); 
    }
  },[socket])
  return (
    <div className="flex flex-col h-full overflow-y-auto p-4">
      {messages.map((message, index) => {
        const isOwnMessage = socket?.id === message.id; 

        return (
          <div
            key={index}
            className={`flex mb-2 ${isOwnMessage ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-xl shadow ${
                isOwnMessage
                  ? "bg-gray-200 text-black text-right"
                  : "bg-blue-500 text-white text-left"
              }`}
            >
              <div className="text-xs opacity-70">
                {message.from} • {new Date(message.sentAt).toLocaleTimeString()}
              </div>
              <div>{message.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}