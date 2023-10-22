type Props = {
  events: any;
};

export function Events({ events }: Props) {
  return (
    <ul>
      {events.map((event: any, index: any) => (
        <li key={index}>{event}</li>
      ))}
    </ul>
  );
}
