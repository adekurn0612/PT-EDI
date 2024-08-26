import { Router } from "express";
import profileController from "../controllers/profile.controller.js";
import special_handler from "../../../middlewares/auth/special_handler.js";

const router = Router();
router.post("/create", profileController.create);
router.get(
  "/get-detail",
  special_handler.authSpecialHandler(["admin"]),
  profileController.getDetailProfile
);

export default router;
