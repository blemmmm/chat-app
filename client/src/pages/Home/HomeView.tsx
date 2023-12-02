import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { socket } from '../../socket';
import { Events } from '@/components/connection/Events';
import { useEffect, useState } from 'react';
import '@/styles/scrollbar.css';
import { IMessage } from '@/shared/interfaces/IMessage';

const HomeView = () => {
  const [events, setEvents] = useState<Array<IMessage>>([]);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState('');

  const getUser = localStorage.getItem('user');
  const parseUser = getUser ? JSON.parse(getUser) : undefined;

  const saveUser = () => {
    if (user !== '') {
      localStorage.setItem('user', JSON.stringify({ user: user }));
    }
  };

  const sendMessage = (message: IMessage) => {
    socket.emit('chat', JSON.stringify(message));
    setMessage('');
    saveUser();
  };

  useEffect(() => {
    socket.on('chat', (data: string) => {
      const parseData = JSON.parse(data) as IMessage;
      setEvents((previous) => [...previous, parseData]);
    });

    return () => {
      socket.off('chat');
    };
  }, [events]);

  useEffect(() => {
    if (user === '') {
      setUser(parseUser ? parseUser.user : '');
    }
  }, []);

  return (
    <div className="h-[calc(100vh-15vh)] w-screen p-10 overflow-y-auto scrollbar">
      <Events events={events} />

      <div className="fixed bottom-10 w-[calc(100vw-80px)]">
        <div className="flex items-center justify-between gap-4">
          <Input
            className="w-40"
            type="text"
            placeholder="Name"
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
          />
          <Input
            type="text"
            placeholder="Enter your message"
            autoComplete="off"
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendMessage({ user: user, message: message });
              }
            }}
            value={message}
          />
          <Button
            type="button"
            onClick={() =>
              sendMessage({ user: user || 'Anonymous', message: message })
            }
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
