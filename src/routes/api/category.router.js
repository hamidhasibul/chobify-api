import { Router } from "express";

import { verifyJWT } from "../../middlewares/auth.middlewares.js";
import { upload } from "../../middlewares/multer.middleware.js";

import {
  addCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../../controllers/api/category.controller.js";

const router = Router();

router
  .route("/")
  .get(getCategories)
  .post(verifyJWT, upload.single("image"), addCategory);

router.route("/:categoryId").get(getCategory).put(verifyJWT, updateCategory);

export default router;
