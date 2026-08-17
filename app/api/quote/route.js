import { NextResponse } from "next/server";
import { sendEnquiryEmail } from "@/lib/mailer";

export const runtime = "nodejs";

const MAX_TOTAL_ATTACHMENT_BYTES = 4 * 1024 * 1024;

export async function POST(request) {
  let formData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_form" }, { status: 400 });
  }

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const country = String(formData.get("country") || "").trim();
  const treatment = String(formData.get("treatment") || "").trim();
  const dates = String(formData.get("dates") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const consent = formData.get("consent") === "true";

  if (!name || !email || !phone || !country || !consent) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  const files = formData.getAll("files").filter((f) => typeof f === "object" && "arrayBuffer" in f);
  const totalSize = files.reduce((sum, f) => sum + f.size, 0);
  if (totalSize > MAX_TOTAL_ATTACHMENT_BYTES) {
    return NextResponse.json({ ok: false, error: "files_too_large" }, { status: 413 });
  }

  const attachments = await Promise.all(
    files.map(async (f) => ({
      filename: f.name,
      content: Buffer.from(await f.arrayBuffer()).toString("base64"),
    }))
  );

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Country: ${country}`,
    `Treatment: ${treatment}`,
    `Preferred dates: ${dates || "—"}`,
    "",
    "Message:",
    message || "—",
  ].join("\n");

  try {
    await sendEnquiryEmail({
      subject: `Free quote request — ${name}`,
      text,
      replyTo: email,
      attachments,
    });
  } catch (err) {
    console.error("quote route: failed to send email", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
