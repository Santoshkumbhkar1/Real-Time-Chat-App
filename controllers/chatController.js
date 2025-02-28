import Message from "../models/message.js";

// Get all messages
export const getMessages = async (req, res) => {
    try {
        const messages = await Message.find().populate("sender", "name");
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};
