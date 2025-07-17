"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAuthenticated_1 = require("../../middlewares/isAuthenticated");
const isAdmin_1 = require("../../middlewares/isAdmin");
const account_routes_1 = __importDefault(require("./account-routes"));
const cart_routes_1 = __importDefault(require("./cart-routes"));
const order_routes_1 = __importDefault(require("./order-routes"));
const product_routes_1 = __importDefault(require("./product-routes"));
const router = (0, express_1.Router)();
router.use(isAuthenticated_1.isAuthenticated, isAdmin_1.isAdmin);
router.use('/account', account_routes_1.default);
router.use('/cart', cart_routes_1.default);
router.use('/orders', order_routes_1.default);
router.use('/products', product_routes_1.default);
exports.default = router;
