import mongoose from "mongoose";

const LogSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["INFO", "SUCCESS", "WARN", "ERROR", "DB"],
    default: "INFO",
  },
  msg: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  metadata: {
    type: Object,
    default: {},
  },
});

export default mongoose.models.Log || mongoose.model("Log", LogSchema);
