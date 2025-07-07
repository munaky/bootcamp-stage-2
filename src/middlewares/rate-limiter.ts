import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 60 * 1000, //60 sec
    limit: 60,
    message: 'terlalu banyak request, coba lain kali'
}); 

export default limiter;