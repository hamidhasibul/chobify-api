import { Router } from "express";

import registerRouter from "./auth/register.router.js";
import loginRouter from "./auth/login.router.js";
import logoutRouter from "./auth/logout.router.js";

import categoryRouter from "./api/category.router.js";

const router = Router();

// AUTH routes

router.use("/register", registerRouter);
router.use("/login", loginRouter);
router.use("/logout", logoutRouter);

// API routes

router.use("/api/v1/categories", categoryRouter);

export default router;
