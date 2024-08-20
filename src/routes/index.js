import { Router } from "express";
import registerRouter from "./auth/register.router.js";

const router = Router();

// AUTH routes

router.use("/register", registerRouter);

// API routes

export default router;
