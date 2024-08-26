import { Router } from "express";
import jobOpeningRouter from "./job_opening.router.js";
import provinsiRouter from "./provinsi.router.js";
import kotaRouter from "./kota.router.js";
import kecamatanRouter from "./kecamatan.router.js";
import kelurahanRouter from "./kelurahan.router.js";
import profileRouter from "./profile.router.js";

const router = Router();
router.use("/job-opening", jobOpeningRouter);
router.use("/provinsi", provinsiRouter);
router.use("/kota", kotaRouter);
router.use("/kecamatan", kecamatanRouter);
router.use("/kelurahan", kelurahanRouter);
router.use("/profile", profileRouter);
export default router;
