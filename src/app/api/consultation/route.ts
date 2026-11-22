import { NextResponse } from "next/server";
import { validateConsultation, type ConsultationInput } from "@/lib/consultation";

/**
 * Consultation form endpoint — integration point.
 *
 * Set CONSULTATION_WEBHOOK_URL (Make, Zapier, n8n, Google Apps Script, CRM webhook…)
 * and every valid submission is forwarded as JSON. Without it, the endpoint answers 503
 * so the UI never claims a request was received when it was not stored anywhere.
 */
export async function POST(request: Request) {
  let body: Partial<ConsultationInput> & { website?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Pretend success without forwarding.
  if (body.website) return NextResponse.json({ ok: true });

  const errors = validateConsultation(body);
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, error: "validation", errors }, { status: 422 });

  const webhook = process.env.CONSULTATION_WEBHOOK_URL;
  if (!webhook) {
    console.warn("[consultation] CONSULTATION_WEBHOOK_URL is not set — submission not stored.");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const payload = {
    source: "fatima-landing",
    submittedAt: new Date().toISOString(),
    name: body.name!.trim(),
    phone: body.phone!.trim(),
    email: body.email?.trim() || null,
    profile: body.profile,
    goal: body.goal,
    count: body.count,
    message: body.message?.trim() || null,
  };

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[consultation] forwarding failed", err);
    return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
  }
}
