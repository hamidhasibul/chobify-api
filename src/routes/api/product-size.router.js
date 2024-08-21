import { Router } from "express";
import {
  addProductSize,
  getProductSizes,
  updateProductSize,
} from "../../controllers/api/product-size.controller.js";
import { verifyJWT } from "../../middlewares/auth.middlewares.js";

const router = Router();

router.route("/").get(getProductSizes).post(verifyJWT, addProductSize);

router.route("/:productSizeId").put(verifyJWT, updateProductSize);

export default router;
