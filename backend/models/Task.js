import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Task", TaskSchema);
