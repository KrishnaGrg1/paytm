"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoutes_1 = __importDefault(require("./authRoutes"));
const accountRoutes_1 = __importDefault(require("./accountRoutes"));
const profileRoutes_1 = __importDefault(require("./profileRoutes"));
const jwtfromUser_1 = __importDefault(require("../middlewares/jwtfromUser"));
const mainRoutes = (0, express_1.Router)();
mainRoutes.use("/user", authRoutes_1.default);
mainRoutes.use('/account', jwtfromUser_1.default, accountRoutes_1.default);
mainRoutes.use('/user', jwtfromUser_1.default, profileRoutes_1.default);
exports.default = mainRoutes;
