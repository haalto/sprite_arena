import express from "express";
import { createServer, Server } from "http";
import { Server as SocketServer, Socket } from "socket.io";
const PORT = 4000;

const app = express();
const server = createServer(app);
const io = new SocketServer(server as Server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: Socket) => {
  console.log(`${socket.id} connected `);
  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
  });

  socket.on("health", (data: string) => {
    console.log(data);
  });
});

app.get("/health", (_, res) => {
  res.end("OK");
});

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
