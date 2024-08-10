import { Router } from "express";
import variant from "./variant.router.js";
import stationPrinter from "./station_printer.router.js";
import meja from "./meja.routers.js";
import kategori from "./kategori.router.js";
import product from "./product.router.js";
import promo from "./promo.router.js";

const router = Router();
router.get("/", (req, res) => {
  res.send(`selamat belajar backend`);
});
router.use("/variant", variant);
router.use("/station-printer", stationPrinter);
router.use("/meja", meja);
router.use("/kategori", kategori);
router.use("/product", product);
router.use("/promo", promo);

export default router;
