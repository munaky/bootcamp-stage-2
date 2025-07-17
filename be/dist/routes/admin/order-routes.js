"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("../../controllers/admin/order-controller");
const router = (0, express_1.Router)();
router.get('/', order_controller_1.getAll);
router.get('/get/:id', order_controller_1.get);
exports.default = router;
