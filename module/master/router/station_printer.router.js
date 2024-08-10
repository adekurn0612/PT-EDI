import { Router } from "express";
import stationPrinterController from "./../controllers/station_printer.controller.js";

const router = Router();

router.post("/create", stationPrinterController.create);

export default router;
