"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
/* Middleware */
const cors_1 = require("./middlewares/cors");
const rate_limiter_1 = require("./middlewares/rate-limiter");
const session_1 = require("./middlewares/session");
const error_handler_1 = require("./middlewares/error-handler");
/* Routes */
const auth_routes_1 = __importDefault(require("./routes/auth-routes"));
const index_1 = __importDefault(require("./routes/user/index"));
const index_2 = __importDefault(require("./routes/admin/index"));
/* Global Variable */
const globals_1 = require("./globals");
const app = (0, express_1.default)();
const port = globals_1.globals.PORT;
app.use('/images', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
app.use(express_1.default.json());
app.use(rate_limiter_1.limiter);
app.use(cors_1.cors);
app.use(session_1.session);
app.use('/auth', auth_routes_1.default);
app.use('/user', index_1.default);
app.use('/admin', index_2.default);
app.use(error_handler_1.errorHandler);
app.listen(port, () => console.log(`run on port ${port}`));
