import { Router } from "express";
import productController from "../controllers/product.controller.js";

const router = Router();

router.post("/create", productController.create);

export default router;
