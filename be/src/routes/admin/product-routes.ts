import { Router } from "express";
import { getAll, get, create, update, remove, enable, disable } from "../../controllers/admin/product-controller";
import { uploadImage } from '../../utils/multer';

const router = Router()

router.get('/', getAll);
router.get('/get/:id', get);
router.post('/create', uploadImage, create);
router.patch('/update/:id', uploadImage, update);
router.patch('/enable/:id', enable);
router.patch('/disable/:id', disable);
router.delete('/delete/:id', remove);

export default router;