import express from "express";
import { Server } from 'socket.io'
import dotenv from "dotenv";
import { createServer } from 'http';
import { initialGameState, move, GameState } from "./game";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

var gameState: GameState = initialGameState

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
  io.emit('game', gameState)
  
  socket.on('move', (data) => {
    console.log('server received:', data.gameState)
    gameState = move(data.gameState, data.index)
    console.log('new game state:', gameState)
    io.emit('game', gameState)
  })
})

httpServer.listen(PORT, () => {
    console.log(`🚀 HTTP server running on http://localhost:${PORT}`);
});