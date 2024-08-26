import { Router } from "express";
import kelurahanController from "../controllers/kelurahan.controller.js";

const router = Router();
router.get("/list", kelurahanController.findAll);

export default router;
