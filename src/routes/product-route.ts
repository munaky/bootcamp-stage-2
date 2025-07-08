import express from 'express';
import { get, create, update, remove } from '../controllers/product-controller';

const router = express.Router();

router.get('/get', get);
router.post('/create', create);
router.put('/update/:id', update);
router.delete('/delete/:id', remove);

export default router
