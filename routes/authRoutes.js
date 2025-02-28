import express from "express";
import { regUser, logUser } from "../controllers/authController.js";

const authRoutes = express.Router();

// Authentication Routes
authRoutes.post("/register", regUser);
authRoutes.post("/login", logUser );

export default authRoutes;