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
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("../prisma/client");
const jwt_1 = require("../utils/jwt");
const auth_validator_1 = require("../validators/auth-validator");
const response_format_1 = require("../utils/response-format");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const v = yield (0, auth_validator_1.registerValidator)(Object.assign(Object.assign({}, req.body), { image: req.file }));
        const hashed = yield bcrypt_1.default.hash(v.password, 10);
        const result = yield client_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield tx.user.create({
                data: Object.assign({ name: v.name, email: v.email, password: hashed, role: v.role }, (v.image ? { image: v.image } : {}))
            });
            if (user.role != 'USER')
                return user;
            const customer = yield tx.customer.create({
                data: {
                    userId: user.id,
                    address: v.address,
                    phone: v.phone,
                }
            });
            return { user, customer };
        }))
            .catch(() => { throw { message: 'Failed to create data!' }; });
        (0, response_format_1.resSuccess)(res, 201, 'Data created!', result);
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const v = yield (0, auth_validator_1.loginValidator)(req.body);
        const user = yield client_1.prisma.user.findUnique({
            where: { email: v.email },
            include: { customer: true }
        });
        const isMatch = yield bcrypt_1.default.compare(v.password, user.password);
        if (!isMatch)
            throw { code: 400, message: 'Invalid password!' };
        const token = (0, jwt_1.signToken)(user);
        req.session.token = token;
        (0, response_format_1.resSuccess)(res, 200, 'Login Success', { token, user });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
