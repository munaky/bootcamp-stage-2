import { Router } from "express";
import { register, login, get } from "../controllers/auth-controller";
import { uploadImage } from "../utils/multer";

const router = Router()

router.get('/get', get);
router.post('/register', uploadImage, register);
router.post('/login', login);

export default router;