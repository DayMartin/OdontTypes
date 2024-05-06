import { Router, Request, Response } from 'express';
import {parcelasController} from "../controllers/parcelasController";

const router = Router();


router.route("/parcelas/all").get((req, res) => parcelasController.getParcelas(req, res));
router.route("/parcelas/id").post((req, res) => parcelasController.getParcela(req, res));
router.route("/parcelas/idOs").post((req, res) => parcelasController.getParcelaOs(req, res));
router.route("/parcelas/delete").delete((req, res) => parcelasController.deleteParcela(req, res));


export { router as parcelasRouter };