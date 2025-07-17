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
exports.updateValidator = exports.createValidator = exports.updateSchema = exports.createSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const client_1 = require("../../prisma/client");
exports.createSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).required(),
    price: joi_1.default.number().integer().min(1).required(),
    stock: joi_1.default.number().integer().min(0).required(),
    image: joi_1.default.any().optional().custom((value, helpers) => value.filename),
});
exports.updateSchema = exports.createSchema.keys({
    id: joi_1.default.number().required(),
    name: joi_1.default.string().min(3).optional(),
    price: joi_1.default.number().integer().min(1).optional(),
    stock: joi_1.default.number().integer().min(0).optional(),
    image: joi_1.default.any().optional().custom((value, helpers) => value.filename),
});
const createValidator = (data) => {
    const { value, error } = exports.createSchema.validate(data);
    if (error)
        throw error;
    return value;
};
exports.createValidator = createValidator;
const updateValidator = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { value, error } = exports.updateSchema.validate(data);
    if (error)
        throw error;
    const product = yield client_1.prisma.product.findUnique({ where: { id: value.id } });
    if (!product)
        throw { code: 404, message: 'Data not found or already disabled!' };
    return value;
});
exports.updateValidator = updateValidator;
