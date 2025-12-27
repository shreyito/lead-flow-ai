import Log from "../models/Log.js";

export const logEvent = async ({ type, leadId, message, meta = {} }) => {
  try {
    await Log.create({
      type,
      leadId,
      message,
      meta,
    });
  } catch (err) {
    // Never crash the app because of logging
    console.error("Log write failed:", err.message);
  }
};
