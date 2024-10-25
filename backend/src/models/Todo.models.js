import mongoose from "mongoose";
const TodoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  task: String,
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
});
const todo= mongoose.model("Todo", TodoSchema);
export default todo;
