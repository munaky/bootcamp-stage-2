"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const filterSchema = joi_1.default.object({
    search: joi_1.default.string().default('').optional(),
    orderBy: joi_1.default.string().default('id').optional(),
    order: joi_1.default.string().valid('asc', 'desc').default('asc').optional(),
    page: joi_1.default.number().integer().min(1).default(1).optional(),
    limit: joi_1.default.number().integer().min(1).default(10).optional(),
    minPrice: joi_1.default.number().integer().min(1).default(1).optional(),
    maxPrice: joi_1.default.number().integer().min(1).optional(),
});
const filterValidator = (data) => {
    const { value, error } = filterSchema.validate(data);
    if (error)
        throw error;
    return value;
};
exports.filterValidator = filterValidator;
