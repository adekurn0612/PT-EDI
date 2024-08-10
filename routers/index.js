import { Router } from "express";
import manajemenAkses from "./../module/manajemen_akses/router/index.js";
import master from "./../module/master/router/index.js";
import transaksi from "./../module/transaksi/router/index.js";

const router = Router();

router.use("/manajemen-akses", manajemenAkses);
router.use("/master", master);
router.use("/transaksi", transaksi);

export default router;
