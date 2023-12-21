const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);

import { Server } from "socket.io";

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("connection made");
  socket.on("donate", ({ previousAmount, amountDonated }) => {
    // sends to all except sending client (remove broadcast?)
    socket.broadcast.emit("donate", {
      previousAmount,
      amountDonated,
    });
  });
});

server.listen(3001, () => console.log("server listening on port 3001"));
