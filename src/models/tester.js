const mongoose = require("mongoose");

const testerSchema = new mongoose.Schema(
  {
    tester_id: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Tester = mongoose.model("Tester", testerSchema);

module.exports = Tester;
