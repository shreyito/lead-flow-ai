import nodemailer from "nodemailer";
import { logEvent } from "./log.service.js";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendFollowupEmail = async (lead) => {
  try {
    const subject =
      lead.intent === "high"
        ? "Quick follow-up on your inquiry"
        : "Thanks for reaching out to us";

    const html = `
      <p>Hi ${lead.name},</p>
      <p>Thank you for your interest in <strong>${lead.product}</strong>.</p>
      ${
        lead.intent === "high"
          ? "<p>Our team will contact you shortly to discuss pricing and availability.</p>"
          : "<p>We’ve shared our catalogue and will be happy to assist you further.</p>"
      }
      <p>Regards,<br/>Sales Team</p>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: lead.email,
      subject,
      html,
    });

    await logEvent({
      type: "EMAIL_SENT",
      leadId: lead._id,
      message: `Follow-up email sent to ${lead.email}`,
    });
  } catch (error) {
    await logEvent({
      type: "EMAIL_ERROR",
      leadId: lead._id,
      message: error.message,
    });

    throw error;
  }
};
