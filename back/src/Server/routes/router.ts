import { Router } from 'express';
import { usersRouter } from "./users";
import { servicoRouter } from "./servicos";
import { osRouter } from "./os";
import { parcelasRouter } from "./parcelas";
import { estoqueRouter } from './estoque';
import { categoriaRouter } from './categoria';
import { historicEstoqueRouter } from './historicEstoque';

const router = Router();

router.use("/", usersRouter);
router.use("/", servicoRouter);
router.use("/", osRouter);
router.use("/", parcelasRouter);
router.use("/", estoqueRouter);
router.use("/", categoriaRouter);
router.use("/", historicEstoqueRouter);

export { router };
