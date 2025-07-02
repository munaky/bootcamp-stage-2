import express from 'express';
import authRoutes from './routes/auth-routes';
import supplierRoutes from './routes/supplier-routes';
import productRoutes from './routes/product-routes';
import { isAuthenticated } from './middlewares/isAuthenticated';
import { isAdmin } from './middlewares/isAdmin';

const app = express();
const port = process.env.PORT;

app.use(express.json());

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