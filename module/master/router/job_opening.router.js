import { Router } from "express";
import jobOpeningController from "../controllers/job_opening.controller.js";

const router = Router();
router.post("/create", jobOpeningController.create);
router.get("/resource", jobOpeningController.resource);

export default router;
