import { Router } from "express";
import { methods as carroController } from "./../controllers/carro.controller";

const router = Router();

router.get("/", carroController.getCarros);
router.get("/:id", carroController.getCarro);
router.post("/", carroController.addCarro);
router.put("/:id", carroController.updateCarro);
router.delete("/:id", carroController.deleteCarro);

export default router;