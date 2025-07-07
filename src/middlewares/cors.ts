import cors from 'cors';

export const corsMiddleware = cors({
    origin: 'https://google.com',
    credentials: true
});