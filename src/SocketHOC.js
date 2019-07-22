import React from "react";
import SocketIOClient from "socket.io-client";
import config from "./constant.js";

console.log(config.token);

export let socket;

export const connect = ({ roomId, userId }) => {
  console.log(roomId, userId);
  socket = SocketIOClient(config.url, {
    query: { token: config.token }
  });
  socket.on("connect", function() {
    console.log(`connected to ${roomId}`);
    // socket.emit("join", { roomId, userId });
    status({ value: "visible", userId: config.userId });
    joinRoom({ roomId, userId });
  });
  socket.on("disconnect", () => {
    console.log(`Disconnected from ${roomId}`);
    
  });
};

export const joinRoom = ({ roomId, userId }) => {
  socket.emit("join", { roomId, userId });
};

export const createMessage = (roomId, messageBody, updateMessageStatus) => {
  console.log(roomId, messageBody);

  socket.emit(
    "createMessage",
    {
      roomId,
      messageBody
    },
    status => {
      if (status) {
        updateMessageStatus({ _id: messageBody._id, status: "Sent" });
      }
    }
  );
};

export const typing = (value, roomId) => {
  socket.emit("typing", {
    value,
    roomId
  });
};

export const status = ({ value, userId }) => {
  if (socket) {
    socket.emit("status", {
      value,
      userId
    });
  }
};
