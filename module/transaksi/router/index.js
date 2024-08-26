import { Router } from "express";
import riwayatPendidikanRouter from "./riwayat_pendidikan.router.js";
import riwayatPekerjaanRouter from "./riwayat_pekerjaan.router.js";
import riwayatPelatihanRouter from "./riwayat_pelatihan.router.js";
import riwayatApplyRouter from "./riwayat_apply.router.js";

const router = Router();
router.use("/riwayat-pendidikan", riwayatPendidikanRouter);
router.use("/riwayat-pelatihan", riwayatPelatihanRouter);
router.use("/riwayat-pekerjaan", riwayatPekerjaanRouter);
router.use("/riwayat-apply", riwayatApplyRouter);
export default router;
