"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jwt_1 = require("../utils/jwt");
const response_format_1 = require("../utils/response-format");
const isAuthenticated = (req, res, next) => {
    try {
        /* const token = (req as any).session.token; */
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkN1c3RvbWVyIiwiZW1haWwiOiJ1c2VyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJEo1TTlpVHZkdXA4dDNBRTYuM1l0dnVZd2JaY2htcWU2NG1hbk1ONFdRSnN6bDZlN1NTMjEyIiwicm9sZSI6IlVTRVIiLCJpbWFnZSI6IjE3NTE3OTg3NDA0NzEucG5nIiwiY3JlYXRlQXQiOiIyMDI1LTA3LTA2VDAyOjIwOjE2LjE2OVoiLCJ1cGRhdGVkQXQiOiIyMDI1LTA3LTA2VDEwOjQ1OjQwLjQ4NVoiLCJjdXN0b21lciI6eyJpZCI6MSwidXNlcklkIjoxLCJwb2ludCI6OTk5MjIwLCJhZGRyZXNzIjoiSmFrYXJ0YSIsInBob25lIjoiNjI5Mzg0NzU5ODciLCJjcmVhdGVBdCI6IjIwMjUtMDctMDZUMDI6MjA6MTYuMTcyWiIsInVwZGF0ZWRBdCI6IjIwMjUtMDctMDdUMDE6MDI6NDQuMDQ5WiJ9LCJpYXQiOjE3NTI1MDQzODUsImV4cCI6MTc1MjU5MDc4NX0.KYv5UOMlT1jIJCclR-h7T-Su2LEilslIAwCB0i3GuMI';
        if (!token) {
            res.status(401).json({ message: "Unauthorized!" });
            return;
        }
        const decoded = (0, jwt_1.verifyToken)(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        (0, response_format_1.resError)(res, 401, 'No session found!');
    }
};
exports.isAuthenticated = isAuthenticated;
