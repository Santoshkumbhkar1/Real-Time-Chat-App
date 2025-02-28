import express from "express";
import Mesg from "../models/message.js";
const router = express.Router();

// Get all chat messages
router.get("/", async (req, res) => {
    try {
        const messages = await Mesg.find().populate("sender", "username");
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
});

export default router;
