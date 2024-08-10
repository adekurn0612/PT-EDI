import { Router } from "express";
import mejaController from "../controllers/kategori.controller.js";

const router = Router();

router.post("/create", mejaController.create);

export default router;
