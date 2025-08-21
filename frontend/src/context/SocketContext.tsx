import React, { useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = 'http://localhost:3000';

interface SocketContextType {
    socket: Socket | null;
    isConnected: boolean;
}

const SocketContext = React.createContext<SocketContextType>({
    socket: null,
    isConnected: false,
})

export const SocketProvider = ({ children } : { children : React.ReactNode}) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const newSocket = io(SOCKET_URL);

        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Connected to socket server');
            setIsConnected(true);
        })
        newSocket.on("disconnect", () => {
            setIsConnected(false);
            console.log("❌ Disconnected from server");
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => useContext(SocketContext);