import { Router } from "express";
import productPromo from "./product_promo.router.js";
import order from "./order.router.js";
import orderDetail from "./order_detail.router.js";

const router = Router();

router.use("/product-promo", productPromo);
router.use("/order", order);
router.use("/order-detail", orderDetail);

export default router;
