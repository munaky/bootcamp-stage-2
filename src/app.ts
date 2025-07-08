import express from 'express';

/* Middleware */
import { upload } from './utils/multer';
import { corsMiddleware } from './middlewares/cors';
import limiter from './middlewares/rate-limiter';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { isAdmin } from './middlewares/isAdmin';

/* Routes */
import authRoutes from './routes/auth-routes';

/* Any */
import { uploadProfile } from './controllers/user-controller';

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(limiter)

app.use('/auth', authRoutes);

app.get('/', isAuthenticated, (req, res) => {
    res.send('authorized');
});

app.get('/admin', isAuthenticated, isAdmin, (req, res) => {
    res.send('authorized');
});

app.post('/upload-profile-picture', isAuthenticated, upload.single('profile'), uploadProfile);


app.listen(port, () => console.log(`run on port ${port}`));