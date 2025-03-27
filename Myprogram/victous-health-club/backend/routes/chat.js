const express = require("express");
const router = express.Router();
const Chat = require("../models/chatModel");

module.exports = function (io) {
    io.on("connection", (socket) => {
        console.log("🟢 New User Connected");

        socket.on("chatMessage", async (data) => {
            const newMessage = new Chat({ user: data.user, message: data.message });
            await newMessage.save();
            io.emit("message", data);
        });

        socket.on("disconnect", () => {
            console.log("🔴 User Disconnected");
        });
    });

    return router;
};
