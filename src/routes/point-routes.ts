import { Router } from "express";
import { get, transfer } from "../controllers/point-controller";

const router = Router();

router.get('/get/:id',  get);
router.post('/transfer-points', transfer);

export default router;