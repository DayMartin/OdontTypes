import { Router, Request, Response } from 'express';
import {estoqueController} from "../controllers/estoqueController";

const router = Router();

router.route("/estoque/all").get((req: Request, res: Response) => estoqueController.getEstoques(req, res));
router.route("/estoque/get").post((req: Request, res: Response) => estoqueController.getEstoque(req, res));
router.route("/estoque/create").post((req: Request, res: Response) => estoqueController.createEstoque(req, res));
router.route("/estoque/AllCategoria").post((req: Request, res: Response) => estoqueController.getCategoriaEstoque(req, res));
router.route("/estoque/AllFornecedor").post((req: Request, res: Response) => estoqueController.getFornecedorEstoque(req, res));
router.route("/estoque/delete").delete((req: Request, res: Response) => estoqueController.deleteEstoque(req, res));

export { router as estoqueRouter };
