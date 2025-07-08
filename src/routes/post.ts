import express from 'express'
import { getAll, get, createOrUpdate, remove } from '../controllers/post';

const router = express.Router()

router.get('/:user_id/', getAll);
router.get('/:user_id/get/:post_id', get);
router.post('/:user_id/create', createOrUpdate);
router.put('/:user_id/update/:post_id', createOrUpdate);
router.delete('/:user_id/delete/:post_id', remove);

export default router;