import { Router } from "express";
import { getAll, add, update, remove } from "../controllers/product-controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAdmin } from "../middlewares/isAdmin";

const router = Router()

router.use(isAuthenticated);

router.get('/', getAll);
router.post('/add', isAdmin, add);
router.put('/update/:id', isAdmin, update);
router.delete('/delete/:id', isAdmin, remove);

export default router;