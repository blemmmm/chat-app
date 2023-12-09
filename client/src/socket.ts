import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = 'https://groufie.blem.dev:3000';

export const socket = io(URL);
