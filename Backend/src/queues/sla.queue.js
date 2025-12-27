import { Queue, Worker } from "bullmq";
import redis from "../config/redis.js";
import Lead from "../models/Lead.js";
import { sendSlaEscalationEmail } from "../services/slaEmail.service.js";
import { logEvent } from "../services/log.service.js";

export const slaQueue = new Queue("sla-escalations", {
  connection: redis,
});

new Worker(
  "sla-escalations",
  async (job) => {
    try {
      const lead = await Lead.findById(job.data.leadId);

      if (!lead || lead.status !== "new") {
        await logEvent({
          type: "SLA_SKIPPED",
          leadId: job.data.leadId,
          message: "SLA escalation skipped due to lead status",
        });
        return;
      }

      await sendSlaEscalationEmail(lead);

      await logEvent({
        type: "SLA_ESCALATION_SENT",
        leadId: lead._id,
        message: "SLA escalation email sent to manager",
      });
    } catch (error) {
      await logEvent({
        type: "SLA_ERROR",
        leadId: job.data.leadId,
        message: error.message,
      });
    }
  },
  { connection: redis }
);
