import { Router } from "express";
import kecamatanController from "../controllers/kecamatan.controller.js";

const router = Router();
router.get("/list", kecamatanController.findAll);

export default router;
