import { Queue, Worker } from "bullmq";
import redis from "../config/redis.js";
import Lead from "../models/Lead.js";
import { sendFollowupEmail } from "../services/email.service.js";
import { logEvent } from "../services/log.service.js";

export const followupQueue = new Queue("followups", {
  connection: redis,
});

new Worker(
  "followups",
  async (job) => {
    try {
      const lead = await Lead.findById(job.data.leadId);

      if (!lead || lead.status !== "new") {
        await logEvent({
          type: "FOLLOWUP_SKIPPED",
          leadId: job.data.leadId,
          message: "Follow-up skipped due to lead status",
        });
        return;
      }

      if (lead.email) {
        await sendFollowupEmail(lead);

        await logEvent({
          type: "FOLLOWUP_EMAIL_SENT",
          leadId: lead._id,
          message: `Follow-up email sent to ${lead.email}`,
        });
      }

      await logEvent({
        type: "FOLLOWUP_EXECUTED",
        leadId: lead._id,
        message: "Follow-up processed successfully",
      });
    } catch (error) {
      await logEvent({
        type: "FOLLOWUP_ERROR",
        leadId: job.data.leadId,
        message: error.message,
      });
    }
  },
  { connection: redis }
);
