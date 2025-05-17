import { Response } from "express";
import IRequest from "../middlewares/IRequest";
import { startSession } from "mongoose";
import Account from "../models/Account";
import User from "../models/User";

const transfer = async (req: IRequest, res: Response): Promise<void> => {
  const session = await startSession();
  try {
    session.startTransaction();

    const { amount, to } = req.body;

    if (!amount || amount <= 0) {
      await session.abortTransaction();
      res.status(400).json({ message: "Amount must be greater than 0" });
      return;
    }

    const sender = await Account.findOne({ userId: req.userId }).session(
      session
    );
    if (!sender) {
      await session.abortTransaction();
      res.status(404).json({ message: "Sender account not found" });
      return;
    }

    if (amount > sender.balance) {
      await session.abortTransaction();
      res.status(400).json({ message: "Insufficient balance" });
      return;
    }

    const recipient = await Account.findOne({ userId: to }).session(session);
    if (!recipient) {
      await session.abortTransaction();
      res.status(404).json({ message: "Recipient account not found" });
      return;
    }

    // Perform updates
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);
    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    await session.commitTransaction();

    res.status(200).json({
      message: "Transfer successful",
      from: req.userId,
      to,
      amount
    });
    return;
  } catch (e) {
    try {
      await session.abortTransaction();
    } catch (abortErr) {
      console.error("Error aborting transaction:", abortErr);
    }

    console.error("Transfer failed:", e);
    res.status(500).json({
      message: e instanceof Error ? e.message : "Unexpected error occurred"
    });
  } finally {
    session.endSession();
  }
};

const AccountDetails = async (req: IRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const existingUser = await User.findOne({
      _id: userId
    });
    if (!existingUser) {
      res.status(400).json({
        message: "User not found"
      });
      return;
    }
    const AccountDetails = await Account.findOne({
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
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
      res.status(500).json({
        message: e.message
      });
    } else {
      console.error("Unexpected Error has occured ");
      res.status(500).json({
        message: "Unexpected error has occurred"
      });
    }
  }
};

const AccountController = {
  transfer,
  AccountDetails
};
export default AccountController;
