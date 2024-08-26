import { Router } from "express";
import userController from "./../controllers/users.controllers.js";
import loginController from "../controllers/login.controller.js";

const router = Router();

router.post("/create", userController.create);
router.post("/login", loginController.login);

export default router;
