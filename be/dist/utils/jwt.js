"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const globals_1 = require("../globals");
const signToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, globals_1.globals.JWT_SECRET, { expiresIn: '1d' });
};
exports.signToken = signToken;
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, globals_1.globals.JWT_SECRET);
};
exports.verifyToken = verifyToken;
