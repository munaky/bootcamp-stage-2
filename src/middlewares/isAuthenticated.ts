import { RequestHandler } from "express";
import { verifyToken } from "../utils/jwt";
import { resError } from "../utils/response-format";

export const isAuthenticated: RequestHandler = (req, res, next) => {
    try {
        /* const token = (req as any).session.token; */
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRmbWJBY0hWRVVqUnR1L1l5a0Jsc1IuMWE5azM2Q20ySnZGYzE2RThqbmR4Unpoby9LQmFmVyIsInJvbGUiOiJBRE1JTiIsImltYWdlIjoicHJvZmlsZS1kZWZhdWx0LnBuZyIsImNyZWF0ZUF0IjoiMjAyNS0wNy0wN1QwMDoxNzoxMC45MzFaIiwidXBkYXRlZEF0IjoiMjAyNS0wNy0wN1QwMDoxNzoxMC45MzFaIiwiY3VzdG9tZXIiOm51bGwsImlhdCI6MTc1MTg0NzQ0NSwiZXhwIjoxNzUxOTMzODQ1fQ.6YLbyq7SWJjoTRjPztsHHMBwQH5-VnYmFAQ6DDt8PuU'

        if (!token) {
            res.status(401).json({ message: "Unauthorized!" });
            return;
        }

        const decoded = verifyToken(token);

        (req as any).user = decoded;

        next();
    } catch(error) {
        resError(res, 401, 'No session found!')
    }
}