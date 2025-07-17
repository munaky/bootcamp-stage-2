"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = exports.registerValidator = exports.loginSchema = exports.registerUserSchema = exports.registerAdminSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const client_1 = require("../prisma/client");
exports.registerAdminSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
    role: joi_1.default.string().valid('USER', 'ADMIN').required(),
    image: joi_1.default.any().optional().custom((value, helpers) => {
        return value.filename;
    }),
});
exports.registerUserSchema = exports.registerAdminSchema.keys({
    address: joi_1.default.string().required(),
    phone: joi_1.default.string().required(),
});
exports.loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
/* Validator when register USER and ADMIN */
const registerValidator = (data) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    if (data.role == 'USER') {
        result = exports.registerUserSchema.validate(data);
    }
    else {
        result = exports.registerAdminSchema.validate(data);
    }
    if (result.error)
        throw result.error;
    if (yield client_1.prisma.user.findUnique({ where: { email: result.value.email } }))
        throw { code: 409, message: 'Email already used!' };
    return result.value;
});
exports.registerValidator = registerValidator;
const loginValidator = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = exports.loginSchema.validate(data);
    if (result.error)
        throw result.error;
    if (!(yield client_1.prisma.user.findUnique({ where: { email: result.value.email } })))
        throw { code: 401, message: 'Email not registered!' };
    return result.value;
});
exports.loginValidator = loginValidator;
