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
exports.get = exports.getAll = void 0;
const response_format_1 = require("../../utils/response-format");
const client_1 = require("../../prisma/client");
const order_filter_validator_1 = require("../../validators/order-filter-validator");
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filters = (0, order_filter_validator_1.filterValidator)(req.query);
        const orderByFilter = {};
        orderByFilter[filters.orderBy] = filters.order;
        const orders = yield client_1.prisma.orderItem.groupBy({
            by: 'orderId',
            _sum: { total: true },
            _count: { quantity: true },
            having: {
                total: {
                    _sum: Object.assign({ gte: filters.minTotalPrice }, (filters.maxTotalPrice ? { lte: filters.maxTotalPrice } : {})),
                },
                quantity: {
                    _sum: Object.assign({ gte: filters.minTotalQuantity }, (filters.maxTotalQuantity ? { lte: filters.maxTotalQuantity } : {}))
                }
            },
            orderBy: { orderId: 'asc' },
            skip: (filters.page - 1) * filters.limit,
            take: filters.limit,
        });
        (0, response_format_1.resSuccess)(res, 200, 'Data retrieved!', orders);
    }
    catch (error) {
        next(error);
    }
});
exports.getAll = getAll;
const get = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const order = yield client_1.prisma.order.findUnique({
            where: { id },
            include: { orderItems: true },
        });
        if (!order)
            throw { code: 404, message: 'Data not found!' };
        (0, response_format_1.resSuccess)(res, 200, 'Data retrieved!', order);
    }
    catch (error) {
        next(error);
    }
});
exports.get = get;
