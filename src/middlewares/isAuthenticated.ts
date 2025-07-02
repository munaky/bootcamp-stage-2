import { RequestHandler } from "express";
import { verifyToken } from "../utils/jwt";

export const isAuthenticated: RequestHandler = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "unauthorized" });
            return;
        }

        const decoded = verifyToken(token);

        (req as any).user = decoded;

        next();
    } catch(error) {
        res.status(401).json({ message: "invalid token" });
    }
}