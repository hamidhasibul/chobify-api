import { Router } from "express";

import { logoutUser } from "../../controllers/logout.controller.js";

const router = Router();

router.route("/").get(logoutUser);

export default router;
