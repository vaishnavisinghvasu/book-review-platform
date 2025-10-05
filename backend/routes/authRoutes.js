// backend/routes/authRoutes.js
import express from "express";
import { signupUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// POST /api/auth/signup
router.post("/signup", signupUser);

// POST /api/auth/login
router.post("/login", loginUser);

export default router;
