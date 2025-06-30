import { Router } from "express";
import { get } from "../controllers/book-controller";

const router = Router()

router.get('/books', get)

export default router