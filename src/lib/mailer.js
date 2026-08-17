import { Resend } from "resend";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "info@doc-bandic.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "Poliklinika Bandić Website <onboarding@resend.dev>";

export async function sendEnquiryEmail({ subject, text, replyTo, attachments }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    replyTo,
    subject,
    text,
    attachments,
  });

  if (error) {
    throw new Error(error.message || "Resend API returned an error");
  }
}
