import { Router } from "express";
import { getAll } from "../controllers/order";

const router = Router();

router.get("/summary", getAll);

export default router;
