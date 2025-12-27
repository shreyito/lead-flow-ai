import Lead from "../models/Lead.js";
import { categorizeLead } from "../services/ai.service.js";
import { followupQueue } from "../queues/followup.queue.js";
import { slaQueue } from "../queues/sla.queue.js"; // 🔥 SLA QUEUE

/**
 * CREATE LEAD
 * - Classifies lead using AI
 * - Stores lead in MongoDB
 * - Schedules follow-up + SLA escalation using BullMQ
 */
export const createLead = async (req, res) => {
  try {
    const { name, email, phone, product, message, source } = req.body;

    // Basic guard
    if (!name || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "name, phone and message are required",
      });
    }

    // 1️⃣ AI categorization (Gemini)
    const aiResult = await categorizeLead(message);

    // 2️⃣ Store lead in MongoDB
    const lead = await Lead.create({
      name,
      email,
      phone,
      product,
      message,
      source,
      ...aiResult,
      status: "new",
    });

    // ─────────────────────────────────────────────
    // 3️⃣ FOLLOW-UP DELAY (TEST MODE)
    // ─────────────────────────────────────────────
    const followupDelay = 5 * 1000;

    /*
    // ✅ PRODUCTION FOLLOW-UP
    const followupDelay =
      aiResult.intent === "high"
        ? 15 * 60 * 1000
        : 48 * 60 * 60 * 1000;
    */

    await followupQueue.add(
      "followup",
      { leadId: lead._id },
      { delay: followupDelay }
    );

    // ─────────────────────────────────────────────
    // 4️⃣ SLA ESCALATION DELAY
    // ─────────────────────────────────────────────

    // ⏱️ TEST MODE (10 seconds)
    const slaDelay = 10 * 1000;

    /*
    // ✅ PRODUCTION SLA RULES
    const slaDelay =
      aiResult.intent === "high"
        ? 15 * 60 * 1000      // 15 min
        : aiResult.intent === "medium"
        ? 2 * 60 * 60 * 1000  // 2 hrs
        : 24 * 60 * 60 * 1000 // 24 hrs
    */

    await slaQueue.add(
      "sla-escalation",
      { leadId: lead._id },
      { delay: slaDelay }
    );

    return res.status(201).json({
      success: true,
      lead,
    });
  } catch (error) {
    console.error("Create lead error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create lead",
    });
  }
};

/**
 * GET ALL LEADS (Admin / CRM)
 */
export const getLeads = async (req, res) => {
  const leads = await Lead.find().sort({ createdAt: -1 });
  res.json(leads);
};

/**
 * UPDATE LEAD STATUS (Human-in-the-loop)
 */
export const updateLeadStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "status is required",
      });
    }

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      {
        status,
        lastActionAt: new Date(),
      },
      { new: true }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    await logEvent({
      type: "LEAD_STATUS_UPDATED",
      leadId: lead._id,
      message: `Lead status updated to ${status}`,
    });

    return res.json({
      success: true,
      lead,
    });
  } catch (error) {
    await logEvent({
      type: "LEAD_STATUS_UPDATE_ERROR",
      leadId: req.params.id,
      message: error.message,
    });

    return res.status(500).json({
      success: false,
      message: "Failed to update lead status",
    });
  }
};

