import { Router } from "express";
import orderDetailController from "../controllers/order_detail.controller.js";

const router = Router();

router.post("/create", orderDetailController.create);
export default router;
