type Props = {
  isConnected: boolean;
};

export function ConnectionState({ isConnected }: Props) {
  return (
    <span className="fixed bottom-0 left-1 text-xs text-gray-400">
      WebSocket connection: {'' + isConnected}
    </span>
  );
}
