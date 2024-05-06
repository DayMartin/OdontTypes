import { Router, Request, Response } from 'express';
import {servicosController} from "../controllers/servicoController";

const router = Router();

router.route("/servicos/all").get((req, res) => servicosController.getService(req, res));
router.route("/servicos/create").post((req, res) => servicosController.createServico(req, res));
router.route("/servicos/get").post((req, res) => servicosController.getServico(req, res));
router.route("/servicos/delete").delete((req, res) => servicosController.deleteServico(req, res));


export { router as servicoRouter };
