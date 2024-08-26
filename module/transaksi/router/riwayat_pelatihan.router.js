import { Router } from "express";
import riwayatPelatihanController from "../controllers/riwayat_pelatihan.controller.js";

const router = Router();
router.post("/create", riwayatPelatihanController.create_riwayat);
router.put("/update", riwayatPelatihanController.update_riwayat);
router.delete("/delete", riwayatPelatihanController.delete_riwayat);

export default router;
