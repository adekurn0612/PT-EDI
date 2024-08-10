import { Router } from "express";
import promoController from "./../controllers/promo.controller.js";

const router = Router();

router.post("/create", promoController.create);

export default router;
