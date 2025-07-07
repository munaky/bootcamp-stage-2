import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';

/* Middleware */
import { corsMiddleware } from './middlewares/cors';
import limiter from './middlewares/rate-limiter';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { isAdmin } from './middlewares/isAdmin';

/* Routes */
import authRoutes from './routes/auth-routes';
import supplierRoutes from './routes/supplier-routes';
import productRoutes from './routes/product-routes';

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(limiter);
app.use(corsMiddleware);
app.use(cookieParser());
app.use(session({
  secret: 'test',
  resave: false,
  saveUninitialized: true,
}))

app.use('/auth', authRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/suppliers/products', productRoutes);

app.get('/', isAuthenticated, (req, res) => {
    res.send('authorized');
});

app.get('/admin', isAuthenticated, isAdmin, (req, res) => {
    res.send('authorized');
});


app.listen(port, () => console.log(`run on port ${port}`));