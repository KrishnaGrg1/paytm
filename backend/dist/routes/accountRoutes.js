"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validations_1 = __importDefault(require("../middlewares/validations"));
const accountValidation_1 = __importDefault(require("../validations/accountValidation"));
const accountController_1 = __importDefault(require("../controllers/accountController"));
const accountRoutes = (0, express_1.Router)();
accountRoutes.post('/transferMoney', (0, validations_1.default)(accountValidation_1.default.transferMoney), accountController_1.default.transfer);
accountRoutes.get('/balance', accountController_1.default.AccountDetails);
exports.default = accountRoutes;
