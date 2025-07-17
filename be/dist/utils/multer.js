"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const globals_1 = require("../globals");
const storage = multer_1.default.diskStorage({
    destination: globals_1.globals.UPLOAD_PATH,
    filename: (req, file, cb) => {
        const extension = path_1.default.extname(file.originalname);
        cb(null, `${Date.now()}${extension}`);
    }
});
exports.uploadImage = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 2 * 1000000 //2mb
    },
    fileFilter: function (req, file, callback) {
        const allowedExtension = ['.png', '.jpg', '.jpeg'];
        const extension = path_1.default.extname(file.originalname);
        if (!allowedExtension.includes(extension)) {
            return callback(new Error('only [png, jpeg, jpg] are allowed'));
        }
        callback(null, true);
    },
}).single('image');
