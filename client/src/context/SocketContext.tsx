import React, { createContext, useContext, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import * as io from 'socket.io-client';

type SocketContextType = Socket | null;

const SocketContext = createContext<SocketContextType>(null);

type SocketProviderProps = {
    children: React.ReactNode;
}

export const useSocket = () => {
    return useContext(SocketContext);
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = io.connect('https://hackout2024-1.onrender.com');

        newSocket.on('connect', () => {
            console.log('Socket connected');
        });

        newSocket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}
