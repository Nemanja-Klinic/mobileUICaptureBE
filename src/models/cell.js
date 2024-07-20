const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cellSchema = new Schema(
  {
    name: { type: String, required: true },
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    next_url: {
      type: String,
      default: null,
      required: true,
    },
  },
  { timestamps: true }
);

const Cell = mongoose.model("Cell", cellSchema);

module.exports = Cell;
