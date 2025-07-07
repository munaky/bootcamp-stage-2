import { Router } from "express";
import { getAll, add, update, remove, uploadImage } from "../controllers/product-controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isAdmin } from "../middlewares/isAdmin";
import { upload } from '../utils/multer';

const router = Router()

router.use(isAuthenticated);

router.get('/', getAll);
router.post('/add', isAdmin, upload.single('image'), add);
router.put('/update', isAdmin, upload.single('image'), update);
router.patch('/upload-image', isAdmin, upload.single('image'), uploadImage)
router.delete('/delete/:id', isAdmin, remove);

export default router;