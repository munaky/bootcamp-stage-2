import { RequestHandler } from "express";

export const isAdmin: RequestHandler = (req, res, next) => {
    if((req as any).user.role != 'admin') {
        res.status(401).json({message: 'unauthorized'})
        return;
    }

    next();
}