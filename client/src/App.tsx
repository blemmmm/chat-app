import './App.css';

import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { ConnectionState } from './components/connection/ConnectionState';
import { RouterView } from './router/RouterView';
import { socket } from './socket';

function App() {
  const queryClient = new QueryClient();
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    // function onChatEvent(value: string) {
    //   console.log(value);
    //   setEvents((previous) => [...previous, value]);
    // }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, [isConnected]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ConnectionState isConnected={isConnected} />
        <RouterView />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
