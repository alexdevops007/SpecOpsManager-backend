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
    enum: ["Planned", "In Progress", "Paused", "Completed"],
    default: "Planned",
  },
  progress: {
    type: Number,
    default: 0,
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
