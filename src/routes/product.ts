import express from 'express'
import { getAll, get, createOrUpdate, remove } from '../controllers/product';

const router = express.Router()

router.get('/', getAll);
router.get('/:id', get);
router.post('/create', createOrUpdate);
router.put('/update/:id', createOrUpdate);
router.delete('/delete/:id', remove);

export default router;