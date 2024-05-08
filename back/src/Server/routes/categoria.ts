import { Router, Request, Response } from 'express';
import {categoriaController} from "../controllers/categoriaController";

const router = Router();

router.route("/categoria/all").get((req: Request, res: Response) => categoriaController.getCategorias(req, res));
router.route("/categoria/get").post((req: Request, res: Response) => categoriaController.getCategoria(req, res));
router.route("/categoria/create").post((req: Request, res: Response) => categoriaController.createCategoria(req, res));
router.route("/categoria/delete").delete((req: Request, res: Response) => categoriaController.deleteCategoria(req, res));

export { router as categoriaRouter };
