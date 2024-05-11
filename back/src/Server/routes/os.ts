import { Router, Request, Response } from 'express';
import {osController} from "../controllers/osController";

const router = Router();

router.route("/os/all").get((req, res) => osController.getOss(req, res));
router.route("/os/create").post((req, res) => osController.createOs(req, res));
router.route("/os/get").post((req, res) => osController.getOs(req, res));
router.route("/os/totalmes").get((req, res) => osController.consultaMes(req, res));

router.route("/os/delete").delete((req, res) => osController.deleteOS(req, res));


export { router as osRouter };