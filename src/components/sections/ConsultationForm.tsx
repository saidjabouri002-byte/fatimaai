"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, ArrowUpRight, CheckCircle2, Loader2, Lock } from "lucide-react";
import { form } from "@/config/content";
import { CONSULTATION_URL, WHATSAPP_NUMBER } from "@/config/site";
import { validateConsultation, type ConsultationInput, type FieldErrors } from "@/lib/consultation";
import { cn } from "@/lib/cn";

type Status = "idle" | "sending" | "success" | "error";

const empty: ConsultationInput = { name: "", phone: "", email: "", profile: "", goal: "", count: "", message: "" };

const inputCls =
  "w-full rounded-xl border bg-white px-3.5 text-[15px] text-ink placeholder:text-subtle transition-all duration-200 focus:outline-none focus:ring-4";
const ok = "border-line focus:border-yellow-hover focus:ring-yellow/25";
const bad = "border-danger/60 focus:border-danger focus:ring-danger/15";

function Field({
  id,
  label,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-[13px] font-medium text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="flex items-center gap-1 text-[12px] text-danger">
          <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

function Choice({
  name,
  options,
  value,
  onChange,
  error,
  legend,
}: {
  name: keyof ConsultationInput;
  options: readonly { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
  legend: string;
}) {
  return (
    <fieldset className="flex flex-col gap-1.5" aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="mb-1.5 text-[13px] font-medium text-ink">{legend}</legend>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => {
          const checked = value === o.value;
          return (
            <label
              key={o.value}
              className={cn(
                "cursor-pointer rounded-xl border px-3 py-2 text-[13.5px] font-medium transition-all has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-yellow/30",
                checked ? "border-ink bg-ink text-white" : "border-line bg-white text-ink/80 hover:border-[#d9d5ce]",
              )}
            >
              <input type="radio" name={name} value={o.value} checked={checked} onChange={() => onChange(o.value)} className="sr-only" />
              {o.label}
            </label>
          );
        })}
      </div>
      {error && (
        <p id={`${name}-error`} className="flex items-center gap-1 text-[12px] text-danger">
          <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
          {error}
        </p>
      )}
    </fieldset>
  );
}

export function ConsultationForm() {
  const [values, setValues] = useState<ConsultationInput>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [honeypot, setHoneypot] = useState("");

  const set = (k: keyof ConsultationInput) => (v: string) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateConsultation(values);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; errors?: FieldErrors };
      if (res.ok && data.ok) {
        setStatus("success");
        setValues(empty);
      } else {
        if (data.errors) setErrors(data.errors);
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const fallbackHref = WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}` : CONSULTATION_URL;

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        role="status"
        className="flex min-h-[420px] flex-col items-center justify-center gap-4 p-8 text-center"
      >
        <span className="grid h-14 w-14 place-items-center rounded-full bg-yellow">
          <CheckCircle2 className="h-7 w-7 text-ink" aria-hidden="true" />
        </span>
        <p className="max-w-[340px] text-[17px] font-semibold leading-snug text-ink">{form.success}</p>
        <button type="button" onClick={() => setStatus("idle")} className="text-[13px] font-medium text-muted underline underline-offset-4 hover:text-ink">
          Envoyer une autre demande
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4 p-5 sm:p-7" aria-describedby="form-privacy">
      <div>
        <h3 className="text-[20px] font-semibold tracking-tight text-ink">{form.title}</h3>
        <p className="mt-1 text-[13.5px] text-muted">{form.subtitle}</p>
      </div>

      {/* honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Site web
          <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} name="website" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="f-name" label={form.fields.name} error={errors.name}>
          <input
            id="f-name"
            name="name"
            autoComplete="name"
            required
            value={values.name}
            onChange={(e) => set("name")(e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "f-name-error" : undefined}
            className={cn(inputCls, "h-12", errors.name ? bad : ok)}
            placeholder="Ex. Amine Benali"
          />
        </Field>
        <Field id="f-phone" label={form.fields.phone} error={errors.phone}>
          <input
            id="f-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            value={values.phone}
            onChange={(e) => set("phone")(e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "f-phone-error" : undefined}
            className={cn(inputCls, "h-12", errors.phone ? bad : ok)}
            placeholder="+213 5 55 12 34 56"
          />
        </Field>
      </div>

      <Field id="f-email" label={form.fields.email} error={errors.email}>
        <input
          id="f-email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(e) => set("email")(e.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "f-email-error" : undefined}
          className={cn(inputCls, "h-12", errors.email ? bad : ok)}
          placeholder="vous@exemple.com"
        />
      </Field>

      <div id="f-profile" tabIndex={-1} className="outline-none">
        <Choice name="profile" legend={form.fields.profile} options={form.profiles} value={values.profile} onChange={set("profile")} error={errors.profile} />
      </div>
      <div id="f-goal" tabIndex={-1} className="outline-none">
        <Choice name="goal" legend={form.fields.goal} options={form.goals} value={values.goal} onChange={set("goal")} error={errors.goal} />
      </div>
      <div id="f-count" tabIndex={-1} className="outline-none">
        <Choice
          name="count"
          legend={form.fields.count}
          options={form.counts.map((c) => ({ value: c, label: c }))}
          value={values.count}
          onChange={set("count")}
          error={errors.count}
        />
      </div>

      <Field id="f-message" label={form.fields.message} error={errors.message}>
        <textarea
          id="f-message"
          name="message"
          rows={3}
          value={values.message}
          onChange={(e) => set("message")(e.target.value)}
          className={cn(inputCls, "resize-none py-3", errors.message ? bad : ok)}
          placeholder="Votre bien, votre programme, vos objectifs…"
        />
      </Field>

      <AnimatePresence>
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="flex items-start gap-2 rounded-xl border border-danger/25 bg-[#fef2f2] p-3 text-[13px] text-danger"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>
              {form.error}
              {fallbackHref && (
                <>
                  {" "}
                  <a href={fallbackHref} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2">
                    {WHATSAPP_NUMBER ? "Écrire sur WhatsApp" : "Réserver un créneau"}
                  </a>
                </>
              )}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary group mt-1 inline-flex h-14 items-center justify-center gap-2 rounded-xl text-[16px] font-semibold transition-all hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> {form.sending}
          </>
        ) : (
          <>
            Réserver mon diagnostic gratuit
            <span className="grid h-6 w-6 place-items-center rounded-full bg-ink/90 text-yellow transition-transform group-hover:translate-x-0.5">
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
            </span>
          </>
        )}
      </button>
      <p id="form-privacy" className="flex items-center justify-center gap-1.5 text-center text-[12px] text-muted">
        <Lock className="h-3 w-3" aria-hidden="true" /> {form.privacy}
      </p>
    </form>
  );
}
