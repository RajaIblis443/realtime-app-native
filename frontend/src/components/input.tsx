import { useState, type FormEvent } from "react";
import { useSocket } from "../context/SocketContext"

export default function Input(){
    const { socket} = useSocket();
    const [message, setMessage] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!socket || message.trim() === '') return;

            socket.emit("chat message", {
              from: socket.id,
              content: message,
              sentAt: new Date().toISOString(),
            });
            setMessage("");
    }

   return (
    <div className="mb-6 mx-2 border fixed bottom-0 left-0 right-0 p-1 bg-white shadow-lg">
      <form
        className="flex justify-between items-center"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Type your message..."
          className="pl-5 py-2 outline-none flex-1"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 px-5 hover:bg-blue-700 rounded-xl"
        >
          Send
        </button>
      </form>
    </div>
  );
}