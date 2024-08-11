import { Router } from "express";
import orderController from "../controllers/order_controller.js";
// import orderDetailController from "../controllers/order_controller.js";

const router = Router();

router.post("/create", orderController.create);
router.post("/kunci", orderController.kunci_order);
router.post("/bayar", orderController.bayar_order);
router.post("/tutup", orderController.tutup_order);
export default router;
