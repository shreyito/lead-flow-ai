import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendSlaEscalationEmail = async (lead) => {
  const subject = `🚨 SLA Breach: ${lead.intent.toUpperCase()} Intent Lead`;

  const html = `
    <h3>SLA Breach Alert</h3>
    <p><strong>Lead Name:</strong> ${lead.name}</p>
    <p><strong>Product:</strong> ${lead.product}</p>
    <p><strong>Intent:</strong> ${lead.intent}</p>
    <p><strong>Created At:</strong> ${lead.createdAt}</p>

    <p style="color:red;">
      This lead has not been contacted within SLA.
    </p>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.MANAGER_EMAIL,
    subject,
    html,
  });

  console.log(`🚨 SLA escalation email sent for lead: ${lead.name}`);
};
