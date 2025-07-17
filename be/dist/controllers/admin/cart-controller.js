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
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeOrder = exports.clear = exports.remove = exports.update = exports.add = exports.getAll = void 0;
const response_format_1 = require("../../utils/response-format");
const client_1 = require("../../prisma/client");
const cart_validator_1 = require("../../validators/admin/cart-validator");
const globals_1 = require("../../globals");
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const products = yield client_1.prisma.cart.findMany({
            where: { userId },
            include: { product: true },
        });
        (0, response_format_1.resSuccess)(res, 200, 'Data retrieved!', products);
    }
    catch (error) {
        next(error);
    }
});
exports.getAll = getAll;
const add = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const v = yield (0, cart_validator_1.addValidator)(req.body);
        let cart = yield client_1.prisma.cart.findFirst({
            where: { userId, productId: v.productId }
        });
        if (cart) {
            cart = yield client_1.prisma.cart.update({
                where: { id: cart.id },
                data: { quantity: { increment: v.quantity } }
            });
            (0, response_format_1.resSuccess)(res, 200, 'Data exist, quantity increased!', cart);
            return;
        }
        else {
            cart = yield client_1.prisma.cart.create({
                data: {
                    userId,
                    productId: v.productId,
                    quantity: v.quantity
                }
            });
        }
        (0, response_format_1.resSuccess)(res, 200, 'Data added!', cart);
    }
    catch (error) {
        next(error);
    }
});
exports.add = add;
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartId = Number(req.params.id);
        const v = yield (0, cart_validator_1.updateValidator)(Object.assign(Object.assign({}, req.body), { cartId }));
        const cart = yield client_1.prisma.cart.update({
            where: { id: v.cartId },
            data: { quantity: v.quantity },
        });
        (0, response_format_1.resSuccess)(res, 200, 'Data updated!', cart);
    }
    catch (error) {
        next(error);
    }
});
exports.update = update;
const remove = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const userId = req.user.id;
        const cart = yield client_1.prisma.cart.delete({ where: { id, userId } })
            .catch(() => { throw { message: 'Failed to delete data!' }; });
        (0, response_format_1.resSuccess)(res, 200, 'Data deleted!', cart);
    }
    catch (error) {
        next(error);
    }
});
exports.remove = remove;
const clear = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const carts = yield client_1.prisma.cart.deleteMany({ where: { userId } })
            .catch(() => { throw { message: 'Failed to delete data!' }; });
        (0, response_format_1.resSuccess)(res, 200, 'Data cleared!', carts);
    }
    catch (error) {
        next(error);
    }
});
exports.clear = clear;
const makeOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const v = yield (0, cart_validator_1.makeOrderValidator)(Object.assign(Object.assign({}, req.body), { userId: user.id }));
        const result = yield client_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            const order = yield client_1.prisma.order.create({
                data: {
                    customerId: v.customerId,
                    receiverName: v.receiverName,
                    receiverAddress: v.receiverAddress,
                    receiverPhone: v.receiverPhone,
                    orderItems: {
                        createMany: {
                            data: v.items.map((i) => {
                                return {
                                    productId: i.product.id,
                                    productName: i.product.name,
                                    productPrice: i.product.price,
                                    quantity: i.quantity,
                                    total: i.quantity * i.product.price,
                                };
                            })
                        }
                    }
                }
            });
            /* Delete cart items */
            yield client_1.prisma.cart.deleteMany({ where: { userId: user.id } });
            if (!v.customerId)
                return order;
            const totalPrice = yield client_1.prisma.orderItem.aggregate({
                where: { orderId: order.id },
                _sum: {
                    total: true,
                }
            });
            const bonusPoint = Math.floor(Number(totalPrice._sum.total) * (Number(globals_1.globals.POINT_GAIN_MULTIPLIER) || 0.001));
            if (bonusPoint == 0)
                return order;
            const customer = yield client_1.prisma.customer.update({
                where: { id: v.customerId },
                data: { point: { increment: bonusPoint } }
            });
            return { bonusPoint, customer, order };
        }));
        if (result.customer) {
            (0, response_format_1.resSuccess)(res, 200, 'Order created, points increased!', result);
        }
        else {
            (0, response_format_1.resSuccess)(res, 200, 'Order created!', result);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.makeOrder = makeOrder;
