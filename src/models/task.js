const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    name: { type: String, required: true },
    cellId: { type: Schema.Types.ObjectId, ref: "Cell", required: true },
    description: { type: String, required: true },
    url: {
      type: String,
      default: null,
      required: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
