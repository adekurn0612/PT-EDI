import { Router } from "express";
import productPromoController from "../controllers/product_promo.controller.js";

const router = Router();

router.post("/create", productPromoController.create);

export default router;
