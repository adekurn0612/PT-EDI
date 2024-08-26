import { Router } from "express";
import provinsiController from "../controllers/provinsi.controller.js";

const router = Router();
router.get("/list", provinsiController.findAll);

export default router;
