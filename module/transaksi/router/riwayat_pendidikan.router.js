import { Router } from "express";
import riwayatPendidikanController from "../controllers/riwayat_pendidikan.controller.js";

const router = Router();
router.post("/create", riwayatPendidikanController.create_riwayat);
router.put("/update", riwayatPendidikanController.update_riwayat);
router.delete("/delete", riwayatPendidikanController.delete_riwayat);

export default router;
