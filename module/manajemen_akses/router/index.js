import { Router } from "express";
import userController from "./user.router.js";

const router = Router();
router.use("/user", userController);

export default router;
