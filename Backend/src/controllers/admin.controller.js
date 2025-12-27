import Lead from "../models/Lead.js";
import Log from "../models/Log.js";
import { logEvent } from "../services/log.service.js";

export const getAdminLeads = async (req, res) => {
  const leads = await Lead.find()
    .sort({ createdAt: -1 })
    .select(
      "name email phone product intent urgency status createdAt"
    );

  res.json({ success: true, leads });
};

export const getAdminLeadById = async (req, res) => {
  const lead = await Lead.findById(req.params.id);

  if (!lead) {
    return res.status(404).json({
      success: false,
      message: "Lead not found",
    });
  }

  res.json({ success: true, lead });
};

export const updateAdminLeadStatus = async (req, res) => {
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({
      success: false,
      message: "status is required",
    });
  }

  const lead = await Lead.findByIdAndUpdate(
    req.params.id,
    { status, lastActionAt: new Date() },
    { new: true }
  );

  if (!lead) {
    return res.status(404).json({
      success: false,
      message: "Lead not found",
    });
  }

  await logEvent({
    type: "ADMIN_STATUS_UPDATED",
    leadId: lead._id,
    message: `Admin updated status to ${status}`,
  });

  res.json({ success: true, lead });
};

export const getLeadLogs = async (req, res) => {
  const logs = await Log.find({ leadId: req.params.id })
    .sort({ createdAt: -1 })
    .select("type message meta createdAt");

  res.json({ success: true, logs });
};
