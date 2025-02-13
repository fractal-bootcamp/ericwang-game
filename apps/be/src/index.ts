import express from "express";
import { Server } from 'socket.io'
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from 'http';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const httpServer = createServer(app);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Express API!" });
});

const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:5174', 'https://tw-connect-4.netlify.app'],
    methods: ['GET', 'POST'],
    credentials: true, 
  },
})

io.on('connection', (socket) => {
  console.log('connected')
  io.emit('message', "hello this is a message from the socket on the server")
  socket.on('msg', (data) => {
    console.log('the server received a message, wow')
    io.emit('message', 'server ack client message')
  })
})

httpServer.listen(PORT, () => {
    console.log(`🚀 HTTP server running on http://localhost:${PORT}`);
});