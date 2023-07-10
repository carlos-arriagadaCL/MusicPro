import { Router } from "express";
import { methods as stockController } from "../controllers/stock.controller";

const router = Router();

router.get("/", stockController.getStocks);
router.get("/:id", stockController.getStock);
router.put("/:id", stockController.updateStock);
router.delete("/:id", stockController.deleteStock);

export default router;
