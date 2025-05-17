import { model, Schema, Types } from "mongoose";

interface IAccount {
  userId: Types.ObjectId;
  balance: number;
}

const AccountSchema = new Schema<IAccount>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    balance: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Account=model<IAccount>("Account",AccountSchema)

export default Account