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
exports.updateValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const client_1 = require("../../prisma/client");
const updateSchema = joi_1.default.object({
    id: joi_1.default.number().integer().required(),
    name: joi_1.default.string().optional(),
    email: joi_1.default.string().email().optional(),
    password: joi_1.default.string().optional(),
    image: joi_1.default.any().optional().custom((value, helpers) => {
        return value.filename;
    }),
});
const updateValidator = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { value, error } = updateSchema.validate(data);
    if (error)
        throw error;
    if (value.email) {
        const emailExist = yield client_1.prisma.user.findUnique({
            where: {
                NOT: { id: value.id },
                email: value.email
            }
        });
        if (emailExist)
            throw { code: 409, message: 'Email already used!' };
    }
    return value;
});
exports.updateValidator = updateValidator;
