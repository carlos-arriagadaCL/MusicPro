import { Router } from "express";
import { methods as ventaController } from "./../controllers/venta.controller";

const router = Router();

router.get("/", ventaController.getVentas);
router.get("/:id", ventaController.getVenta);
router.post("/", ventaController.addVenta);
router.put("/:id", ventaController.updateVenta);
router.delete("/:id", ventaController.deleteVenta);

export default router;