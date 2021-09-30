import React, { createContext, useState, useEffect, useContext } from 'react';
import { HubConnectionBuilder, LogLevel, HubConnection } from '@microsoft/signalr';

const WebSocketContext = createContext<{connection:HubConnection|null;connecting:boolean}>({connection: null, connecting: false});
export const useConnection = () => useContext(WebSocketContext);

export default ({ children }: {children: React.ReactChild}) => {
    const [connection, setConnection] = useState<HubConnection|null>(null);
    const [connecting, setConnecting] = useState<boolean>(false);

    useEffect(() => {
        const connect = async () => {
            try {
                setConnecting(true);
        
                const connection = new HubConnectionBuilder()
                .withUrl("https://localhost:44333/atms")
                .configureLogging(LogLevel.Information)
                .build();
        
                connection.onclose(e => {
                    setConnection(null);
                });
        
                await connection.start();
                setConnection(connection);
                setConnecting(false);
            } catch (e) {
                console.log(e);
            }
        }

        !connection && connect();
    });

    return (
        <WebSocketContext.Provider value={{connection, connecting}}>
            {children}
        </WebSocketContext.Provider>
    )
}