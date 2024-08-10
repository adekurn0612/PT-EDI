import { Router } from "express";
import mejaController from "../controllers/meja.controller.js";

const router = Router();

router.post("/create", mejaController.create);

export default router;
