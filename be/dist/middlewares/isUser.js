"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUser = void 0;
const response_format_1 = require("../utils/response-format");
const isUser = (req, res, next) => {
    if (req.user.role != 'USER') {
        (0, response_format_1.resError)(res, 401, 'Unauthorized, you cant access this feature!');
        return;
    }
    next();
};
exports.isUser = isUser;
