import { Router } from "express";
import userController from "./../controllers/users.controllers.js";

const router = Router();

router.post("/create", userController.create);

export default router;
