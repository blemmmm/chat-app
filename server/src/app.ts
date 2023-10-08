import { Request, Response } from 'express';

/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Define routes and middleware here

app.use(
  cors({
    origin: 'http://localhost:5173', // Replace with your client's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies and authentication headers
  }),
);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req: Request, res: Response) => {
  res.send({ server_response: 'hello express' });
});
