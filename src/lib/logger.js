import connectToDatabase from "./mongodb";
import Log from "@/models/Log";
import Audit from "@/models/Audit";

/**
 * System Logger - Centralized logging for operational telemetry
 */
export async function systemLog(type, msg, metadata = {}) {
  try {
    await connectToDatabase();
    await Log.create({ type, msg, metadata });
    return { success: true };
  } catch (error) {
    console.error("Failed to write system log:", error);
    return { success: false };
  }
}

/**
 * Audit Logger - Forensic-grade tracking for identity actions
 */
export async function auditLog(action, userId, userEmail, role, resource, status, ip) {
  // Support both object and positional arguments for flexibility
  let data;
  if (typeof action === 'object') {
    data = action;
  } else {
    data = { action, userId, userEmail, role, resource, status, ip };
  }

  try {
    await connectToDatabase();
    await Audit.create(data);
    return { success: true };
  } catch (error) {
    console.error("Failed to write audit log:", error);
    return { success: false };
  }
}
