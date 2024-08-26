import { Router } from "express";
import kotaController from "../controllers/kota.controller.js";

const router = Router();
router.get("/list", kotaController.findAll);

export default router;
