"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const server = createServer(app);
const io = new Server(server, { cors: 'http://localhost:5173' });
// Define routes and middleware here
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies and authentication headers
}));
app.get('/', (req, res) => {
    res.sendFile(join(__dirname.replace('server', ''), '../client/index.html'));
});
server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on port ${port}`);
});
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat', (data) => {
        io.emit('chat', data);
    });
});
