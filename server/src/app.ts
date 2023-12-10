/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

import { Socket } from 'socket.io';

const { createServer } = require('node:http');
const { Server } = require('socket.io');

/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

const server = createServer(app);
const io = new Server(server, { cors: 'https://groufie.blem.dev' });

// Define routes and middleware here

app.use(
  cors({
    origin: 'https://groufie.blem.dev', // Replace with your client's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies and authentication headers
  }),
);

app.use(express.static('../../client/dist/'));

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});

io.on('connection', (socket: Socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat', (data) => {
    io.emit('chat', data);
  });
});
