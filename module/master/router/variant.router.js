import { Router } from "express";
import variantController from "./../controllers/variant.controller.js";

const router = Router();

router.post("/create", variantController.create);

export default router;
