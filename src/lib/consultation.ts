/** Shared validation for the consultation form (client + server). */
export type ConsultationInput = {
  name: string;
  phone: string;
  email?: string;
  profile: string;
  goal: string;
  count: string;
  message?: string;
};

export const PROFILES = ["proprietaire", "agent", "agence", "promoteur"] as const;
export const GOALS = ["vendre", "louer", "programme"] as const;
export const COUNTS = ["1", "2 à 5", "6 à 20", "Plus de 20"] as const;

export type FieldErrors = Partial<Record<keyof ConsultationInput, string>>;

export function validateConsultation(input: Partial<ConsultationInput>): FieldErrors {
  const errors: FieldErrors = {};
  const name = (input.name ?? "").trim();
  const phone = (input.phone ?? "").replace(/[\s.\-()]/g, "");
  const email = (input.email ?? "").trim();

  if (name.length < 2) errors.name = "Veuillez indiquer votre nom complet.";
  if (name.length > 120) errors.name = "Nom trop long.";
  if (!/^\+?\d{8,15}$/.test(phone)) errors.phone = "Numéro invalide (ex. 0555 12 34 56 ou +213 555 12 34 56).";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = "Adresse email invalide.";
  if (!PROFILES.includes(input.profile as (typeof PROFILES)[number])) errors.profile = "Choisissez votre profil.";
  if (!GOALS.includes(input.goal as (typeof GOALS)[number])) errors.goal = "Choisissez votre objectif.";
  if (!COUNTS.includes(input.count as (typeof COUNTS)[number])) errors.count = "Indiquez le nombre de biens ou projets.";
  if ((input.message ?? "").length > 2000) errors.message = "Message trop long (2000 caractères max.).";
  return errors;
}
