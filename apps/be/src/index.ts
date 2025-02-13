import express from "express";
import { Server } from 'socket.io'
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from 'http';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Express API!" });
});

const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:5174', 'https://tw-connect-4.netlify.app/'],
    methods: ['GET', 'POST'],
    credentials: true, 
  },
})

io.on('connection', (socket) => {
  console.log('connected')
})

httpServer.listen(PORT, () => {
    console.log(`🚀 HTTP server running on http://localhost:${PORT}`);
});