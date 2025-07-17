"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resError = exports.resSuccess = exports.resJson = void 0;
const resJson = (res, code, status, message = '', data = null) => {
    res.status(Number(code) || 500).json({
        code,
        status,
        message,
        data
    });
};
exports.resJson = resJson;
const resSuccess = (res, code, message = '', data = null) => {
    res.status(Number(code) || 500).json({
        code,
        status: 'success',
        message,
        data
    });
};
exports.resSuccess = resSuccess;
const resError = (res, code, message = '', data = null) => {
    res.status(Number(code) || 500).json({
        code,
        status: 'error',
        message,
        data
    });
};
exports.resError = resError;
