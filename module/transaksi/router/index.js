import { Router } from "express";
import productPromo from "./product_promo.router.js";
import order from "./order.router.js";

const router = Router();

router.use("/product-promo", productPromo);
router.use("/order", order);

export default router;
