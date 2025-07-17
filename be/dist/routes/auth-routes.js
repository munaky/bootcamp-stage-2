"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth-controller");
const multer_1 = require("../utils/multer");
const router = (0, express_1.Router)();
router.post('/register', multer_1.uploadImage, auth_controller_1.register);
router.post('/login', auth_controller_1.login);
exports.default = router;
