"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globals = void 0;
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.globals = Object.assign(Object.assign({}, process.env), { APP_PATH: path_1.default.join(__dirname, '..'), FULL_UPLOAD_PATH: path_1.default.join(__dirname, '..', process.env.UPLOAD_PATH) });
