import express, { urlencoded } from 'express';
import productRoutes from './routes/product-route';
import orderRoutes from './routes/order-route';
import orderItemRoutes from './routes/order-item-route';

const app = express()
const port = 3000

app.use(express.json());

app.use('/api/product', productRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/order', orderItemRoutes)

app.listen(port, () => {
    console.log('running');
})