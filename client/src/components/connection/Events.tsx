import { IMessage } from '@/shared/interfaces/IMessage';
import { Avatar } from '../ui/avatar';
import { getInitials } from '@/shared/utils/getInitials';

type Props = {
  events: IMessage[];
};

export function Events({ events }: Props) {
  return (
    <>
      {events.length > 0 ? (
        <ul>
          {events.map((event: IMessage, index: number) => (
            <li key={index} className="flex items-center gap-2 my-3">
              <div className="w-[40px]">
                <Avatar className="bg-gray-200 flex items-center justify-center">
                  {getInitials(event.user)}
                </Avatar>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xs text-gray-400">{event.user}</span>
                <span>{event.message}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <span className="text-[10px] italic text-slate-500">
          To start chatting, enter your name and your message
        </span>
      )}
    </>
  );
}
