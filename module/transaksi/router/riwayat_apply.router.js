import { Router } from "express";
import riwayatAppplyController from "../controllers/riwayat_apply.js";
import special_handler from "../../../middlewares/auth/special_handler.js";

const router = Router();
router.post("/create", riwayatAppplyController.create);
router.delete(
  "/delete",
  special_handler.authSpecialHandler(["admin"]),
  riwayatAppplyController.delete_apply
);
router.get(
  "/get-detail",
  special_handler.authSpecialHandler(["admin"]),
  riwayatAppplyController.detail_apply
);
router.get("/get-list", riwayatAppplyController.list_apply);
router.put("/update", riwayatAppplyController.update);

export default router;
