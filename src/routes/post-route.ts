import express from 'express';
import { get, create, remove } from '../controllers/post-controller';

const router = express.Router();

router.get('/get', get);
router.post('/create', create);
router.get('/delete/:id', remove);

export default router
