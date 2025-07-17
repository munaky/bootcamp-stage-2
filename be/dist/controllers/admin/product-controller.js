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
exports.restore = exports.remove = exports.update = exports.create = exports.get = exports.getAll = void 0;
const product_filter_validator_1 = require("../../validators/product-filter-validator");
const client_1 = require("../../prisma/client");
const response_format_1 = require("../../utils/response-format");
const product_validator_1 = require("../../validators/admin/product-validator");
const path_1 = __importDefault(require("path"));
const globals_1 = require("../../globals");
const promises_1 = __importDefault(require("fs/promises"));
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filters = (0, product_filter_validator_1.filterValidator)(req.query);
        const orderByFilter = {};
        orderByFilter[filters.orderBy] = filters.order;
        const products = yield client_1.prisma.product.findMany({
            where: {
                name: { contains: filters.search, mode: 'insensitive' },
                price: Object.assign({ gte: filters.minPrice }, (filters.maxPrice ? { lte: filters.maxPrice } : {}))
            },
            orderBy: orderByFilter,
            skip: (filters.page - 1) * filters.limit,
            take: filters.page * filters.limit,
        });
        (0, response_format_1.resSuccess)(res, 200, 'Data Retrieved!', products);
    }
    catch (error) {
        next(error);
    }
});
exports.getAll = getAll;
const get = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const products = yield client_1.prisma.product.findUnique({ where: { id } });
        if (!products)
            throw { code: 404, message: 'Data not found!' };
        (0, response_format_1.resSuccess)(res, 200, 'Data Retrieved!', products);
    }
    catch (error) {
        next(error);
    }
});
exports.get = get;
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const v = (0, product_validator_1.createValidator)(Object.assign(Object.assign({}, req.body), { image: req.file }));
        const product = yield client_1.prisma.product.create({
            data: Object.assign({ name: v.name, price: v.price, stock: v.stock }, (v.image ? { image: v.image } : {}))
        });
        (0, response_format_1.resSuccess)(res, 201, 'Data created!', product);
    }
    catch (error) {
        next(error);
    }
});
exports.create = create;
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = Number(req.params.id);
        const v = yield (0, product_validator_1.updateValidator)(Object.assign(Object.assign({}, req.body), { image: req.file, id }));
        if (v.image) {
            const image = (_a = (yield client_1.prisma.user.findUnique({ where: { id } }))) === null || _a === void 0 ? void 0 : _a.image;
            if (image && image != 'profile-default.png') {
                const filePath = path_1.default.join(globals_1.globals.FULL_UPLOAD_PATH, image);
                yield promises_1.default.unlink(filePath).catch(() => { return; });
            }
        }
        if (!v.name && !v.price && !v.stock && !v.image)
            throw { code: 200, message: 'Nothing changed!' };
        const product = yield client_1.prisma.product.update({
            where: { id },
            data: Object.assign(Object.assign(Object.assign(Object.assign({}, (v.name ? { name: v.name } : {})), (v.price ? { price: v.price } : {})), (v.stock ? { stock: v.stock } : {})), (v.image ? { image: v.image } : {}))
        });
        (0, response_format_1.resSuccess)(res, 200, 'Data updated!', product);
    }
    catch (error) {
        next(error);
    }
});
exports.update = update;
const remove = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const product = yield client_1.prisma.product.update({
            where: { id },
            data: { deleteAt: new Date() }
        }).catch(() => { throw { message: 'Failed to delete data!' }; });
        (0, response_format_1.resSuccess)(res, 200, 'Data deleted!', product);
    }
    catch (error) {
        next(error);
    }
});
exports.remove = remove;
const restore = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const products = yield client_1.prisma.product.update({
            where: { id },
            data: { deleteAt: null }
        }).catch(() => { throw { message: 'Failed to restore data!' }; });
        ;
        (0, response_format_1.resSuccess)(res, 200, 'Data restored!', products);
    }
    catch (error) {
        next(error);
    }
});
exports.restore = restore;
