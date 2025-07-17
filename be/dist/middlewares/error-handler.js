"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const response_format_1 = require("../utils/response-format");
const errorHandler = (err, req, res, next) => {
    const message = err.message || 'Internal Server Error';
    const code = err.code || 500;
    (0, response_format_1.resError)(res, code, message);
};
exports.errorHandler = errorHandler;
