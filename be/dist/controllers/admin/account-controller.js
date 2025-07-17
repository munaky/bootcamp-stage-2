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
exports.remove = exports.update = exports.get = void 0;
const response_format_1 = require("../../utils/response-format");
const account_validator_1 = require("../../validators/user/account-validator");
const client_1 = require("../../prisma/client");
const globals_1 = require("../../globals");
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const get = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, response_format_1.resSuccess)(res, 200, 'Success receiving data!', req.user);
    }
    catch (error) {
        next(error);
    }
});
exports.get = get;
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let user;
        const id = req.user.id;
        let v = yield (0, account_validator_1.updateValidator)(Object.assign(Object.assign({ id }, req.body), { image: req.file }));
        if (v.password)
            v.password = yield bcrypt_1.default.hash(v.password, 10);
        if (v.image) {
            const image = (_a = (yield client_1.prisma.user.findUnique({ where: { id } }))) === null || _a === void 0 ? void 0 : _a.image;
            if (image && image != 'profile-default.png') {
                const filePath = path_1.default.join(globals_1.globals.FULL_UPLOAD_PATH, image);
                yield promises_1.default.unlink(filePath).catch(() => { return; });
            }
        }
        if (v.name || v.email || v.password || v.image) {
            user = yield client_1.prisma.user.update({
                where: { id },
                data: Object.assign(Object.assign(Object.assign(Object.assign({}, (v.name ? { name: v.name } : {})), (v.email ? { email: v.email } : {})), (v.password ? { password: v.password } : {})), (v.image ? { image: v.image } : {}))
            });
        }
        (0, response_format_1.resSuccess)(res, 200, 'Data updated!', user);
    }
    catch (error) {
        next(error);
    }
});
exports.update = update;
const remove = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.user.id;
        const user = yield client_1.prisma.user.delete({ where: { id } });
        req.session.token = '';
        (0, response_format_1.resSuccess)(res, 200, 'Data deleted!', user);
    }
    catch (error) {
        next(error);
    }
});
exports.remove = remove;
