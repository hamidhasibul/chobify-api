import { Router } from "express";

import { verifyJWT } from "../../middlewares/auth.middlewares.js";
import { upload } from "../../middlewares/multer.middleware.js";

import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../../controllers/api/products.controller.js";

const router = Router();

router
  .route("/")
  .get(getProducts)
  .post(verifyJWT, upload.single("image"), addProduct);

router
  .route("/:productId")
  .get(getProduct)
  .put(verifyJWT, updateProduct)
  .delete(verifyJWT, deleteProduct);

export default router;
