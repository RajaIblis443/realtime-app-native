import { useState, useEffect, type FormEvent } from "react";
import MessageList from "./components/messageList";
import Input from "./components/input";
import { useSocket } from "./context/SocketContext";

export default function App() {
  const [open, setOpen] = useState(false);
  const {socket} = useSocket();
  const [username, setUsername] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (username.trim() === '') {
      alert("Username tidak boleh kosong!");
      return;
    }
    socket?.emit("register", {username: username});
    setOpen(false);

  }

  // Modal muncul sekali saat pertama kali buka app
  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 bg-blue-600 text-white font-bold text-lg">
        Chat App 🚀
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto">
        <MessageList />
      </div>

      {/* Input */}
      <Input />

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Welcome 👋</h2>
            <p className="mb-4">
              Selamat datang di Chat App 🚀.  
            </p>
            <p>
              Siapa Nama Kamu?
            </p>
            <form onSubmit={handleSubmit} >
              <input
              type="text"
              id="username"
              title="Username"
              placeholder="Masukkan nama kamu"
              className="border border-gray-300 rounded-lg p-2 w-full mt-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}>
              </input>
              <button
                type="submit"
                className="mt-4 bg-blue-500 text-white p-2 px-5 hover:bg-blue-700 rounded-xl"
                >Masuk</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
