import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { socket } from '../../socket';
import { Events } from '@/components/connection/Events';
import { useEffect, useState } from 'react';

const HomeView = () => {
  const [events, setEvents] = useState<Array<string>>([]);
  const [message, setMessage] = useState('');

  const sendMessage = (message: string) => {
    socket.emit('chat', message);
    setMessage('');
  };

  useEffect(() => {
    socket.on('chat', (data: string) => {
      setEvents((previous) => [...previous, data]);
    });

    return () => {
      socket.off('chat');
    };
  }, [events]);

  return (
    <div>
      <Events events={events} />
      <div className="flex items-center justify-between">
        <Input
          type="text"
          placeholder="Enter your message"
          autoComplete="off"
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              sendMessage(message);
            }
          }}
          value={message}
        />
        <Button type="button" onClick={() => sendMessage(message)}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default HomeView;
