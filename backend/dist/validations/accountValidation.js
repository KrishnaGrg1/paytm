"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const AccountValidation = {
    transferMoney: {
        body: joi_1.default.object().keys({
            to: joi_1.default.string().required().messages({
                'string.empty': 'Recipient userId is required',
                'any.required': 'Recipient userId is required'
            }),
            amount: joi_1.default.number().positive().required().messages({
                'number.base': 'Amount must be a number',
                'number.positive': 'Amount must be greater than zero',
                'any.required': 'Amount is required'
            })
        })
    }
};
exports.default = AccountValidation;
