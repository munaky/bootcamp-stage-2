"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const response_format_1 = require("../utils/response-format");
const isAdmin = (req, res, next) => {
    if (req.user.role != 'ADMIN') {
        (0, response_format_1.resError)(res, 401, 'Unauthorized, you cant access this feature!');
        return;
    }
    next();
};
exports.isAdmin = isAdmin;
