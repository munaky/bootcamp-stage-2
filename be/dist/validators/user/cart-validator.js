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
exports.checkoutValidator = exports.updateValidator = exports.addValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const client_1 = require("../../prisma/client");
const addSchema = joi_1.default.object({
    productId: joi_1.default.number().integer().required(),
    quantity: joi_1.default.number().integer().min(1).required(),
});
const updateSchema = joi_1.default.object({
    cartId: joi_1.default.number().integer().required(),
    quantity: joi_1.default.number().integer().min(1).required(),
});
const checkoutSchema = joi_1.default.array().items(joi_1.default.object({
    id: joi_1.default.number().integer().required(),
    productId: joi_1.default.number().integer().required(),
    quantity: joi_1.default.number().integer().min(1).required(),
}).unknown()).min(1);
const addValidator = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { value, error } = addSchema.validate(data);
    if (error)
        throw error;
    const product = yield client_1.prisma.product.findUnique({ where: { id: value.productId } });
    if (!product)
        throw { code: 404, message: 'Product not found!' };
    if (product.stock < value.quantity)
        throw { code: 409, message: 'Not enough stock!' };
    return value;
});
exports.addValidator = addValidator;
const updateValidator = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { value, error } = updateSchema.validate(data);
    if (error)
        throw error;
    const cart = yield client_1.prisma.cart.findUnique({
        where: { id: value.cartId },
        include: { product: true }
    });
    if (!cart)
        throw { code: 404, message: 'Data not found!' };
    if (cart.product.stock < value.quantity)
        throw { code: 409, message: 'Not enough stock!' };
    return value;
});
exports.updateValidator = updateValidator;
const checkoutValidator = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const carts = yield client_1.prisma.cart.findMany({
        where: { userId },
        include: { product: true }
    });
    const { value, error } = checkoutSchema.validate(carts);
    if (error)
        throw error;
    for (const i of carts) {
        if (i.product.stock < i.quantity)
            throw { code: 409, message: `Not enough stock for productId: ${i.product.id}` };
    }
    return carts;
});
exports.checkoutValidator = checkoutValidator;
