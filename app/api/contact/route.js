import { NextResponse } from "next/server";
import { sendEnquiryEmail } from "@/lib/mailer";

export const runtime = "nodejs";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const phone = String(body.phone || "").trim();
  const message = String(body.message || "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  const text = [`Name: ${name}`, `Email: ${email}`, `Phone: ${phone || "—"}`, "", "Message:", message].join("\n");

  try {
    await sendEnquiryEmail({
      subject: `Website enquiry — ${name}`,
      text,
      replyTo: email,
    });
  } catch (err) {
    console.error("contact route: failed to send email", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
