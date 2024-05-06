import { Router } from 'express';
import { usersRouter } from "./users";
import { servicoRouter } from "./servicos";
import { osRouter } from "./os";
import { parcelasRouter } from "./parcelas";

const router = Router();

router.use("/", usersRouter);
router.use("/", servicoRouter);
router.use("/", osRouter);
router.use("/", parcelasRouter);

export { router };
