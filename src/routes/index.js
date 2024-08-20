import { Router } from "express";
import registerRouter from "./auth/register.router.js";
import loginRouter from "./auth/login.router.js";

const router = Router();

// AUTH routes

router.use("/register", registerRouter);
router.use("/login", loginRouter);

// API routes

export default router;
