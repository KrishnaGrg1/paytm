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
const mongoose_1 = require("mongoose");
const Account_1 = __importDefault(require("../models/Account"));
const User_1 = __importDefault(require("../models/User"));
const transfer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        const { amount, to } = req.body;
        if (!amount || amount <= 0) {
            yield session.abortTransaction();
            res.status(400).json({ message: "Amount must be greater than 0" });
            return;
        }
        const sender = yield Account_1.default.findOne({ userId: req.userId }).session(session);
        if (!sender) {
            yield session.abortTransaction();
            res.status(404).json({ message: "Sender account not found" });
            return;
        }
        if (amount > sender.balance) {
            yield session.abortTransaction();
            res.status(400).json({ message: "Insufficient balance" });
            return;
        }
        const recipient = yield Account_1.default.findOne({ userId: to }).session(session);
        if (!recipient) {
            yield session.abortTransaction();
            res.status(404).json({ message: "Recipient account not found" });
            return;
        }
        // Perform updates
        yield Account_1.default.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        yield Account_1.default.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);
        yield session.commitTransaction();
        res.status(200).json({
            message: "Transfer successful",
            from: req.userId,
            to,
            amount
        });
        return;
    }
    catch (e) {
        try {
            yield session.abortTransaction();
        }
        catch (abortErr) {
            console.error("Error aborting transaction:", abortErr);
        }
        console.error("Transfer failed:", e);
        res.status(500).json({
            message: e instanceof Error ? e.message : "Unexpected error occurred"
        });
    }
    finally {
        session.endSession();
    }
});
const AccountDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const existingUser = yield User_1.default.findOne({
            _id: userId
        });
        if (!existingUser) {
            res.status(400).json({
                message: "User not found"
            });
            return;
        }
        const AccountDetails = yield Account_1.default.findOne({
            userId: userId
        });
        if (!AccountDetails) {
            res.status(400).json({
                message: "Account not found"
            });
            return;
        }
        const UserDetails = {
            username: existingUser.username,
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            Balance: AccountDetails.balance
        };
        res.status(200).json({
            message: "Retrieved Details Sucessfully",
            UserDetails
        });
    }
    catch (e) {
        if (e instanceof Error) {
            console.error(e.message);
            res.status(500).json({
                message: e.message
            });
        }
        else {
            console.error("Unexpected Error has occured ");
            res.status(500).json({
                message: "Unexpected error has occurred"
            });
        }
    }
});
const AccountController = {
    transfer,
    AccountDetails
};
exports.default = AccountController;
