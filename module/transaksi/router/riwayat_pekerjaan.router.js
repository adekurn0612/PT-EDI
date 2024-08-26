import { Router } from "express";
import riwayatPekerjaanController from "../controllers/riwayat_pekerjaan.controller.js";

const router = Router();
router.post("/create", riwayatPekerjaanController.create_riwayat);
router.put("/update", riwayatPekerjaanController.update_riwayat);
router.delete("/delete", riwayatPekerjaanController.delete_riwayat);

export default router;
