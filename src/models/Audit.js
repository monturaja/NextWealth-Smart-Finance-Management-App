import mongoose from "mongoose";

const AuditSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  resource: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["SUCCESS", "FAILURE", "WARN"],
    default: "SUCCESS",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  ip: {
    type: String,
  },
});

export default mongoose.models.Audit || mongoose.model("Audit", AuditSchema);
