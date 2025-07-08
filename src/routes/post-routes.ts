import { Router } from 'express';
import { get, getComments, getCommentsSummary } from '../controllers/post-controller';

const router = Router();

router.get('/', get);
router.get('/:id/comments', getComments);
router.get('/comments-summary', getCommentsSummary);

export default router;