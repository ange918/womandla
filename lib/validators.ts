import { z } from "zod";

export function ageFromIso(iso: string, now = new Date()) {
  const birth = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(birth.getTime())) return null;
  let age = now.getFullYear() - birth.getFullYear();
  const month = now.getMonth() - birth.getMonth();
  if (month < 0 || (month === 0 && now.getDate() < birth.getDate())) age -= 1;
  return age;
}

export function isBeninPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  const local = digits.startsWith("229") ? digits.slice(3) : digits.replace(/^00/, "");
  return local.length >= 8 && local.length <= 10;
}

const phone = z
  .string()
  .trim()
  .min(8, "Indiquez un numéro de téléphone.")
  .refine(isBeninPhone, "Numéro invalide. Exemple : +229 01 97 00 00 00");

export const candidatureStep1 = z.object({
  prenom: z.string().trim().min(2, "Indiquez votre prénom."),
  nom: z.string().trim().min(2, "Indiquez votre nom."),
  dateNaissance: z
    .string()
    .min(1, "Indiquez votre date de naissance.")
    .refine((value) => {
      const age = ageFromIso(value);
      return age !== null && age >= 18 && age <= 35;
    }, "Le programme publié s’adresse aux jeunes femmes de 18 à 35 ans."),
  telephone: phone,
  whatsapp: z.string().trim().refine((value) => value === "" || isBeninPhone(value), "Numéro WhatsApp invalide."),
  email: z.union([z.literal(""), z.string().trim().email("Adresse e-mail invalide.")]),
  langue: z.string().trim().min(2, "Indiquez la langue de préférence."),
  canal: z.enum(["whatsapp", "appel", "sms", "email"], { message: "Choisissez un canal." }),
});

export const candidatureStep2 = z.object({
  commune: z.string().trim().min(2, "Indiquez votre commune de résidence."),
  quartier: z.string().trim().min(2, "Indiquez votre quartier ou village."),
  situation: z.enum(["etudiante", "recherche", "entrepreneure", "autre"], {
    message: "Choisissez votre situation.",
  }),
  nbEnfants: z.coerce.number().int().min(0, "Nombre invalide.").max(20, "Vérifiez le nombre d’enfants."),
  besoinGarde: z.enum(["oui", "non", "non-concerne"]),
});

export const candidatureStep3 = z.object({
  niveau: z.enum(["non-scolarisee", "primaire", "college", "lycee", "superieur", "autre"], {
    message: "Indiquez votre niveau.",
  }),
  filiere: z.enum(["agro", "savon", "digital", "autre"], { message: "Choisissez une filière." }),
  experience: z.string().trim().max(800, "800 caractères maximum."),
  disponibilite: z.enum(["temps-plein", "temps-partiel", "a-preciser"], {
    message: "Indiquez votre disponibilité.",
  }),
});

export const candidatureStep4 = z.object({
  motivation: z.string().trim().max(2000, "2 000 caractères maximum."),
  source: z.enum(["mairie", "proche", "reseaux", "antenne", "autre"], {
    message: "Indiquez comment vous nous avez connus.",
  }),
  audioName: z.string(),
});

export const candidatureStep5 = z.object({
  consentementDonnees: z.boolean().refine((value) => value, {
    message: "Le consentement au traitement des données est nécessaire pour envoyer le dossier.",
  }),
  consentementWhatsapp: z.boolean(),
  consentementImage: z.boolean(),
});

export const candidatureSchema = candidatureStep1
  .merge(candidatureStep2)
  .merge(candidatureStep3)
  .merge(candidatureStep4)
  .merge(candidatureStep5)
  .superRefine((value, ctx) => {
    const hasText = value.motivation.trim().length >= 40;
    const hasAudio = Boolean(value.audioName);
    if (!hasText && !hasAudio) {
      ctx.addIssue({
        code: "custom",
        path: ["motivation"],
        message: "Écrivez au moins 40 caractères, ou joignez un message vocal.",
      });
    }
  });

export type CandidatureInput = z.infer<typeof candidatureSchema>;

export const emptyCandidature: CandidatureInput = {
  prenom: "",
  nom: "",
  dateNaissance: "",
  telephone: "",
  whatsapp: "",
  email: "",
  langue: "Français",
  canal: "whatsapp",
  commune: "",
  quartier: "",
  situation: "recherche",
  nbEnfants: 0,
  besoinGarde: "non-concerne",
  niveau: "college",
  filiere: "agro",
  experience: "",
  disponibilite: "a-preciser",
  motivation: "",
  source: "mairie",
  audioName: "",
  consentementDonnees: false,
  consentementWhatsapp: false,
  consentementImage: false,
};

export const contactSchema = z.object({
  nom: z.string().trim().min(2, "Indiquez votre nom."),
  email: z.string().trim().email("Adresse e-mail invalide."),
  profil: z.enum(["jeune-femme", "donateur", "partenaire", "presse", "autre"]),
  message: z.string().trim().min(20, "Votre message doit contenir au moins 20 caractères."),
  consentement: z.boolean().refine((value) => value, {
    message: "Cochez la case pour autoriser le contact.",
  }),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.string().trim().email("Adresse e-mail invalide."),
});

export const donationSchema = z.object({
  type: z.enum(["ponctuel", "mensuel", "parrainage"]),
  montant: z.coerce.number().int().min(1000, "Le montant minimum est de 1 000 FCFA.").max(50_000_000),
  nom: z.string().trim().min(2, "Indiquez votre nom."),
  email: z.string().trim().email("Adresse e-mail invalide."),
  telephone: z.string().trim().refine((value) => value === "" || isBeninPhone(value), "Numéro invalide."),
  pays: z.string().trim().min(2, "Indiquez votre pays."),
  moyen: z.enum(["fedapay", "kkiapay", "stripe"]),
});

export type DonationInput = z.infer<typeof donationSchema>;

export const suiviSchema = z.object({
  numero: z
    .string()
    .trim()
    .regex(/^WMD-\d{2}-[A-Z]{3}-\d{4}$/i, "Format attendu : WMD-26-BOH-0317."),
  telephone: phone,
});
