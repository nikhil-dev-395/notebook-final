
// aiChat.models.js
import mongoose from "mongoose";

const aiChatSchema = new mongoose.Schema(
  {
    userPrompt: { type: String, required: true },
    aiChat: { type: String, required: false },
    userId: { type: String, required: false },
  },
  { timestamps: true }
);

const AiChatModel = mongoose.model("AiChat", aiChatSchema);

export default AiChatModel;
