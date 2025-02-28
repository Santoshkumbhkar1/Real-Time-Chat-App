import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import Message from "./models/message.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.send("Real-Time Chat Server is running!"));

// Socket.io Events   

// WebSocket Connection
io.on("connection", (socket) => {
    socket.on("sendMessage", async ({ sender, content }) => {
        try {
            const newMessage = new Message({ sender, content });
            await newMessage.save();
            io.emit("receiveMessage", newMessage);
        } catch (error) {
            // Silent error handling in production
            if (process.env.NODE_ENV === "development") {
                console.error("Error saving message:", error.message);
            };

        }});

        socket.on("disconnect", () => {});
});

const PORT = process.env.PORT || 5000;
server.listen(PORT);

