import express from 'express';
import productRoutes from './routes/product'

const app = express();

app.use(express.json());

app.use('/api/product', productRoutes);

app.listen(process.env.PORT, () => {
    console.log('running');
})