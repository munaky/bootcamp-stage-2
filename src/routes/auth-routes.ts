import { Router } from "express";
import { handleLogin, handleRegister, handleGenResetToken, handleResetPassword } from "../controllers/auth-controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = Router()

router.post('/register', handleRegister);
router.post('/login', handleLogin);
router.post('/genResetToken', handleGenResetToken);
router.put('/resetPassword/:token', handleResetPassword);

export default router;