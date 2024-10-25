// models/Account.models.js
import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: { type: String, required: true },
    username: { type: String, required: true },
    completedCount: { type: Number, default: 0 },
    pendingCount: { type: Number, default: 0 },
  },
  {
    timestamps: true, // Automatically create createdAt and updatedAt fields
  }
);

const Account = mongoose.model("Account", AccountSchema);
export default Account;
