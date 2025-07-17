"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.session = void 0;
const express_session_1 = __importDefault(require("express-session"));
const globals_1 = require("../globals");
exports.session = (0, express_session_1.default)({
    secret: globals_1.globals.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
});
