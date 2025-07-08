import { Router } from "express";
import { handleLogin, handleRegister, handleGenResetToken, handleResetPassword } from "../controllers/auth-controller";
import { upload } from '../utils/multer';

const router = Router()

router.post('/register', upload.single('profile'), handleRegister);
router.post('/login', handleLogin);
router.post('/genResetToken', handleGenResetToken);
router.put('/resetPassword/:token', handleResetPassword);

export default router;