import { Router } from "express";
import productController from "../controllers/product.controller.js";

const router = Router();

router.post("/create", productController.create);
// router.get("/find-all-product", productController.findAllProduct);
// router.get("/find-all-promo", productController.findAllPromo);
export default router;
