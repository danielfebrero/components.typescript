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

  return [connection, connecting];
}

export default useConnection;