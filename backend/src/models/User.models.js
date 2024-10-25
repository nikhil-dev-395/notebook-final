import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    aiChat: [{ type: mongoose.Schema.Types.ObjectId, ref: "AiChat" }],
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

const User = userModel;
export default User;
