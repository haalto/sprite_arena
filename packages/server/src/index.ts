import express from "express";
import { createServer, Server } from "http";
import { Server as SocketServer } from "socket.io";
import GameManager from "./classes/GameManager";
const PORT = 4000;

const app = express();
const server = createServer(app);
const io = new SocketServer(server as Server, {
  cors: {
    origin: "*",
  },
});

const gameManager = new GameManager(io);
gameManager.setup();

app.get("/health", (_, res) => {
  res.end("OK");
});

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
