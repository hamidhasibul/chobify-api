import { Router } from "express";

import { registerUser } from "../../controllers/register.controller.js";
import { upload } from "../../middlewares/multer.middleware.js";

const router = Router();

router
  .route("/")
  .post(upload.fields([{ name: "image", maxCount: 1 }]), registerUser);

export default router;
