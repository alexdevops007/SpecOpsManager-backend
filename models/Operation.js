const mongoose = require("mongoose");

const operationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  objectives: {
    type: String,
    required: true,
  },
  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
  ],
  resources: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resource",
    },
  ],
  status: {
    type: String,
    enum: ["Planned", "InProgress", "Completed"],
    default: "Planned",
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
});

const Operation = mongoose.model("Operation", operationSchema);

module.exports = Operation;
