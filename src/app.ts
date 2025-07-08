import express from 'express';
import userRoutes from './routes/user';
import postRoutes from './routes/post';

const app = express();

app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/user-post', postRoutes);

app.listen(process.env.PORT, () => {
    console.log('running');
})