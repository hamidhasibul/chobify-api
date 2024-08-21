import { Router } from "express";

import registerRouter from "./auth/register.router.js";
import loginRouter from "./auth/login.router.js";
import logoutRouter from "./auth/logout.router.js";

import categoryRouter from "./api/category.router.js";
import productSizesRouter from "./api/product-size.router.js";
import productRouter from "./api/products.router.js";

const router = Router();

// AUTH routes

router.use("/register", registerRouter);
router.use("/login", loginRouter);
router.use("/logout", logoutRouter);

// API routes

router.use("/api/v1/categories", categoryRouter);
router.use("/api/v1/product-sizes", productSizesRouter);
router.use("/api/v1/products", productRouter);

export default router;
