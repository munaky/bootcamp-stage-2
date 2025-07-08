import express from 'express';
import { get, add, update , remove } from '../controllers/order-item-controller';

const router = express.Router();

router.get('/:id/get', get);
router.post('/:id/add', add);
router.put('/:id/update/:item_id', update);
router.delete('/:id/delete/:item_id', remove);

export default router
