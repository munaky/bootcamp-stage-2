import express, { urlencoded } from 'express';
import postRoutes from './routes/post-route'

const app = express()
const port = 3000

app.use(express.json());

app.use('/api/v1/post', postRoutes);

app.listen(port, () => {
    console.log('running');
})