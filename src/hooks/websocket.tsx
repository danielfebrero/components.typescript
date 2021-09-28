import { useState, useEffect } from 'react';
import { HubConnectionBuilder, LogLevel, HubConnection } from '@microsoft/signalr';


function useConnection() {
  const [connection, setConnection] = useState<HubConnection>();
  const [connecting, setConnecting] = useState<boolean>(false);


  useEffect(() => {
    const connect = async () => {
      try {
        setConnecting(true);
  
        const connection = new HubConnectionBuilder()
          .withUrl("https://localhost:44333/chat")
          .configureLogging(LogLevel.Information)
          .build();
  
          connection.onclose(e => {
          setConnection(null);
        });
  
        await connection.start();
        setConnection(connection);
      } catch (e) {
        console.log(e);
      }
    }

    connect();
  });

  return [connection, connecting];
}

export default useConnection;