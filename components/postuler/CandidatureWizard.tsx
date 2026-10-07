"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { filieres } from "@/lib/content";
import { ageFromIso, candidatureSchema, candidatureStep1, candidatureStep2, candidatureStep3, candidatureStep4, candidatureStep5, emptyCandidature, type CandidatureInput } from "@/lib/validators";
import { cn } from "@/lib/utils";
import { Button, Card, Field, inputClass } from "@/components/site/ui";

const DRAFT_KEY = "womandla-candidature-draft";
const LOCAL_KEY = "womandla-candidatures-locales";

const stepLabels = ["Identité", "Commune et famille", "Parcours et projet", "Motivation", "Envoi"];

const situations = [
  { id: "etudiante", label: "Étudiante" },
  { id: "recherche", label: "En recherche d’emploi" },
  { id: "entrepreneure", label: "Entrepreneure débutante" },
  { id: "autre", label: "Autre" },
] as const;

const niveaux = [
  { id: "non-scolarisee", label: "Non scolarisée" },
  { id: "primaire", label: "Primaire" },
  { id: "college", label: "Collège" },
  { id: "lycee", label: "Lycée" },
  { id: "superieur", label: "Supérieur" },
  { id: "autre", label: "Autre" },
] as const;

const sources = [
  { id: "mairie", label: "Mairie ou relais communal" },
  { id: "proche", label: "Un proche" },
  { id: "reseaux", label: "Réseaux sociaux" },
  { id: "antenne", label: "Une antenne ou un partenaire" },
  { id: "autre", label: "Autre" },
] as const;

function issuesOf(result: { success: boolean; error?: { issues: { path: PropertyKey[]; message: string }[] } }) {
  if (result.success || !result.error) return {};
  const map: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!map[key]) map[key] = issue.message;
  }
  return map;
}

export default function CandidatureWizard() {
  const router = useRouter();
  const params = useSearchParams();
  const initial = Number(params.get("etape") ?? "1");
  const [step, setStep] = useState(initial >= 1 && initial <= 5 ? initial - 1 : 0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [audio, setAudio] = useState<File | null>(null);
  const [piece, setPiece] = useState<File | null>(null);
  const [pending, setPending] = useState(false);
  const [serverError, setServerError] = useState("");

  const form = useForm<CandidatureInput>({ defaultValues: emptyCandidature });

  useEffect(() => {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as Partial<CandidatureInput>;
      form.reset({ ...emptyCandidature, ...parsed, consentementDonnees: Boolean(parsed.consentementDonnees) });
    } catch {
      localStorage.removeItem(DRAFT_KEY);
    }
  }, [form]);

  useEffect(() => {
    const subscription = form.watch((values) => {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(values));
    });
    return () => subscription.unsubscribe();
  }, [form]);

  function validate(index: number) {
    const values = form.getValues();
    if (index === 0) return issuesOf(candidatureStep1.safeParse(values));
    if (index === 1) return issuesOf(candidatureStep2.safeParse(values));
    if (index === 2) return issuesOf(candidatureStep3.safeParse(values));
    if (index === 3) {
      const base = issuesOf(candidatureStep4.safeParse({ ...values, audioName: audio?.name ?? values.audioName }));
      const hasText = values.motivation.trim().length >= 40;
      if (!hasText && !audio && !values.audioName) {
        base.motivation = "Écrivez au moins 40 caractères, ou joignez un message vocal.";
      }
      return base;
    }
    return issuesOf(candidatureStep5.safeParse(values));
  }

  function next() {
    const found = validate(step);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    const following = Math.min(4, step + 1);
    setStep(following);
    router.replace(`/postuler/formulaire?etape=${following + 1}`, { scroll: false });
  }

  function back() {
    const previous = Math.max(0, step - 1);
    setStep(previous);
    setErrors({});
    router.replace(`/postuler/formulaire?etape=${previous + 1}`, { scroll: false });
  }

  async function send() {
    const found = validate(4);
    setErrors(found);
    const parsed = candidatureSchema.safeParse({ ...form.getValues(), audioName: audio?.name ?? form.getValues("audioName") });
    if (!parsed.success || Object.keys(found).length) {
      setErrors({ ...found, ...issuesOf(parsed) });
      return;
    }
    setPending(true);
    setServerError("");
    try {
      const body = new FormData();
      body.append("payload", JSON.stringify(parsed.data));
      if (audio) body.append("audio", audio);
      if (piece) body.append("piece", piece);
      const response = await fetch("/api/candidatures", { method: "POST", body });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Envoi impossible.");
      const local = JSON.parse(localStorage.getItem(LOCAL_KEY) ?? "[]") as unknown[];
      local.push({ ...data, telephone: parsed.data.telephone });
      localStorage.setItem(LOCAL_KEY, JSON.stringify(local));
      localStorage.removeItem(DRAFT_KEY);
      sessionStorage.setItem("womandla-candidature", JSON.stringify({ ...data, email: parsed.data.email }));
      router.push(`/postuler/confirmation?dossier=${encodeURIComponent(data.numero_dossier)}`);
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Envoi impossible.");
      setPending(false);
    }
  }

  const values = form.watch();
  const age = values.dateNaissance ? ageFromIso(values.dateNaissance) : null;

  return (
    <Card className="p-5 md:p-8">
      <ol className="mb-8 flex items-center gap-1 overflow-x-auto" aria-label="Étapes de la candidature">
        {stepLabels.map((label, index) => (
          <li key={label} className="flex min-w-0 flex-1 items-center gap-1">
            <span
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-sm font-extrabold",
                index === step && "bg-primary text-white",
                index < step && "bg-soft text-primary",
                index > step && "border border-line bg-pale text-muted",
              )}
              aria-current={index === step ? "step" : undefined}
            >
              {index < step ? "✓" : index + 1}
            </span>
            <span className="hidden truncate text-[11px] font-bold text-muted lg:inline">{label}</span>
            {index < stepLabels.length - 1 ? <span className={cn("mx-1 hidden h-0.5 min-w-4 flex-1 sm:block", index < step ? "bg-primary" : "bg-line")} /> : null}
          </li>
        ))}
      </ol>

      {step === 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          <h2 className="md:col-span-2 font-display text-2xl font-extrabold">Identité et contact</h2>
          <Field id="prenom" label="Prénom" error={errors.prenom}>
            <input id="prenom" className={inputClass} autoComplete="given-name" aria-invalid={Boolean(errors.prenom)} aria-describedby={errors.prenom ? "prenom-error" : undefined} {...form.register("prenom")} />
          </Field>
          <Field id="nom" label="Nom" error={errors.nom}>
            <input id="nom" className={inputClass} autoComplete="family-name" aria-invalid={Boolean(errors.nom)} {...form.register("nom")} />
          </Field>
          <Field id="dateNaissance" label="Date de naissance" hint={age !== null ? `Âge calculé : ${age} ans.` : "Le programme publié vise les 18-35 ans."} error={errors.dateNaissance}>
            <input id="dateNaissance" type="date" className={inputClass} aria-invalid={Boolean(errors.dateNaissance)} {...form.register("dateNaissance")} />
          </Field>
          <Field id="telephone" label="Téléphone" error={errors.telephone} hint="Indicatif Bénin accepté, 8 à 10 chiffres.">
            <input id="telephone" type="tel" className={inputClass} autoComplete="tel" placeholder="+229 01 97 00 00 00" aria-invalid={Boolean(errors.telephone)} {...form.register("telephone")} />
          </Field>
          <Field id="whatsapp" label="WhatsApp (si différent)" error={errors.whatsapp}>
            <input id="whatsapp" type="tel" className={inputClass} aria-invalid={Boolean(errors.whatsapp)} {...form.register("whatsapp")} />
          </Field>
          <Field id="email" label="E-mail (facultatif)" error={errors.email}>
            <input id="email" type="email" className={inputClass} autoComplete="email" aria-invalid={Boolean(errors.email)} {...form.register("email")} />
          </Field>
          <Field id="langue" label="Langue de préférence" error={errors.langue}>
            <input id="langue" className={inputClass} aria-invalid={Boolean(errors.langue)} {...form.register("langue")} />
          </Field>
          <fieldset>
            <legend className="mb-1.5 block text-xs font-bold text-muted">Canal préféré</legend>
            <div className="flex flex-wrap gap-2">
              {[
                ["whatsapp", "WhatsApp"],
                ["appel", "Appel"],
                ["sms", "SMS"],
                ["email", "E-mail"],
              ].map(([id, label]) => (
                <label key={id} className={cn("cursor-pointer rounded-full border px-3 py-2 text-sm font-bold", values.canal === id ? "border-primary bg-pale text-primary" : "border-line")}>
                  <input type="radio" className="sr-only" value={id} {...form.register("canal")} />
                  {label}
                </label>
              ))}
            </div>
            {errors.canal ? <p className="mt-1 text-xs font-semibold text-danger">{errors.canal}</p> : null}
          </fieldset>
        </div>
      ) : null}

      {step === 1 ? (
        <div className="grid gap-4">
          <h2 className="font-display text-2xl font-extrabold">Commune et situation</h2>
          <p className="text-sm text-muted">Le recrutement publié se fait par appel à candidatures dans les mairies de chaque commune. La commune n’est pas limitée à une liste fictive.</p>
          <Field id="commune" label="Commune de résidence" error={errors.commune}>
            <input id="commune" className={inputClass} placeholder="Ex. Bohicon" aria-invalid={Boolean(errors.commune)} {...form.register("commune")} />
          </Field>
          <Field id="quartier" label="Quartier ou village" error={errors.quartier}>
            <input id="quartier" className={inputClass} aria-invalid={Boolean(errors.quartier)} {...form.register("quartier")} />
          </Field>
          <fieldset>
            <legend className="mb-2 text-xs font-bold text-muted">Situation socio-économique</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {situations.map((item) => (
                <label key={item.id} className={cn("cursor-pointer rounded-[18px] border-2 p-3 text-sm font-semibold", values.situation === item.id ? "border-primary bg-pale" : "border-line")}>
                  <input type="radio" className="mr-2 accent-primary" value={item.id} {...form.register("situation")} />
                  {item.label}
                </label>
              ))}
            </div>
          </fieldset>
          <Field id="nbEnfants" label="Nombre d’enfants à charge" error={errors.nbEnfants}>
            <input id="nbEnfants" type="number" min={0} max={20} className={inputClass} aria-invalid={Boolean(errors.nbEnfants)} {...form.register("nbEnfants", { valueAsNumber: true })} />
          </Field>
          <fieldset>
            <legend className="mb-2 text-xs font-bold text-muted">Besoin de garde d’enfants pendant la formation</legend>
            <div className="flex flex-wrap gap-2">
              {[
                ["oui", "Oui"],
                ["non", "Non"],
                ["non-concerne", "Non concernée"],
              ].map(([id, label]) => (
                <label key={id} className={cn("cursor-pointer rounded-full border px-3 py-2 text-sm font-bold", values.besoinGarde === id ? "border-primary bg-pale text-primary" : "border-line")}>
                  <input type="radio" className="sr-only" value={id} {...form.register("besoinGarde")} />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="grid gap-4">
          <h2 className="font-display text-2xl font-extrabold">Parcours et filière</h2>
          <Field id="niveau" label="Niveau d’étude" error={errors.niveau}>
            <select id="niveau" className={inputClass} aria-invalid={Boolean(errors.niveau)} {...form.register("niveau")}>
              {niveaux.map((item) => (
                <option key={item.id} value={item.id}>{item.label}</option>
              ))}
            </select>
          </Field>
          <fieldset>
            <legend className="mb-2 text-xs font-bold text-muted">Filière souhaitée</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {filieres.map((item) => (
                <label key={item.id} className={cn("cursor-pointer overflow-hidden rounded-[18px] border-2", values.filiere === item.id ? "border-primary" : "border-line")}>
                  <img src={item.image} alt="" className="h-28 w-full object-cover" />
                  <span className="block p-3">
                    <input type="radio" className="mr-2 accent-primary" value={item.id} {...form.register("filiere")} />
                    <span className="font-bold">{item.title}</span>
                    <span className="mt-1 block text-xs text-muted">{item.text}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <Field id="experience" label="Expérience (facultatif)" error={errors.experience}>
            <textarea id="experience" rows={3} className={inputClass} {...form.register("experience")} />
          </Field>
          <Field id="disponibilite" label="Disponibilité" error={errors.disponibilite}>
            <select id="disponibilite" className={inputClass} {...form.register("disponibilite")}>
              <option value="temps-plein">Temps plein</option>
              <option value="temps-partiel">Temps partiel</option>
              <option value="a-preciser">À préciser avec l’équipe</option>
            </select>
          </Field>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="grid gap-4">
          <h2 className="font-display text-2xl font-extrabold">Motivation</h2>
          <Field id="motivation" label="Pourquoi ce programme ?" hint="Au moins 40 caractères, sauf si vous joignez un vocal." error={errors.motivation}>
            <textarea id="motivation" rows={5} className={inputClass} aria-invalid={Boolean(errors.motivation)} {...form.register("motivation")} />
          </Field>
          <Field id="audio" label="Message vocal (facultatif)" hint="Le fichier n’est stocké que si Supabase Storage est configuré.">
            <input
              id="audio"
              type="file"
              accept="audio/*"
              className={inputClass}
              onChange={(event) => {
                const file = event.target.files?.[0] ?? null;
                setAudio(file);
                form.setValue("audioName", file?.name ?? "");
              }}
            />
          </Field>
          <Field id="piece" label="Pièce justificative (facultative)">
            <input
              id="piece"
              type="file"
              accept="image/*,.pdf"
              className={inputClass}
              onChange={(event) => setPiece(event.target.files?.[0] ?? null)}
            />
          </Field>
          <Field id="source" label="Comment nous avez-vous connus ?" error={errors.source}>
            <select id="source" className={inputClass} {...form.register("source")}>
              {sources.map((item) => (
                <option key={item.id} value={item.id}>{item.label}</option>
              ))}
            </select>
          </Field>
        </div>
      ) : null}

      {step === 4 ? (
        <div className="grid gap-4">
          <h2 className="font-display text-2xl font-extrabold">Récapitulatif</h2>
          <dl className="grid gap-2 text-sm md:grid-cols-2">
            {[
              ["Identité", `${values.prenom} ${values.nom}`],
              ["Téléphone", values.telephone],
              ["Commune", `${values.commune} · ${values.quartier}`],
              ["Filière", filieres.find((item) => item.id === values.filiere)?.title ?? values.filiere],
              ["Motivation", values.motivation || values.audioName || "—"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-pale p-3">
                <dt className="text-xs font-bold text-muted">{label}</dt>
                <dd className="font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
          <button type="button" className="text-left text-sm font-bold text-primary" onClick={() => setStep(0)}>
            Modifier l’identité
          </button>
          <label className="flex gap-3 rounded-[18px] border border-line p-4 text-sm">
            <input type="checkbox" className="mt-1 accent-primary" {...form.register("consentementDonnees")} />
            <span>J’accepte que WOMANDLA traite ces informations pour étudier ma candidature, et les conserve 24 mois. Ce consentement est obligatoire.</span>
          </label>
          {errors.consentementDonnees ? <p className="text-xs font-semibold text-danger" role="alert">{errors.consentementDonnees}</p> : null}
          <label className="flex gap-3 rounded-[18px] border border-line p-4 text-sm">
            <input type="checkbox" className="mt-1 accent-primary" {...form.register("consentementWhatsapp")} />
            <span>J’accepte d’être contactée par WhatsApp au sujet de ce dossier.</span>
          </label>
          <label className="flex gap-3 rounded-[18px] border border-line p-4 text-sm">
            <input type="checkbox" className="mt-1 accent-primary" {...form.register("consentementImage")} />
            <span>J’accepte que mon image puisse être utilisée plus tard, seulement après un accord séparé et explicite.</span>
          </label>
          {serverError ? <p className="text-sm font-semibold text-danger" role="alert">{serverError}</p> : null}
        </div>
      ) : null}

      <div className="mt-8 flex flex-wrap justify-between gap-3">
        <Button type="button" variant="secondary" onClick={back} disabled={step === 0 || pending}>
          Retour
        </Button>
        {step < 4 ? (
          <Button type="button" onClick={next}>Continuer</Button>
        ) : (
          <Button type="button" variant="sun" onClick={send} disabled={pending}>
            {pending ? "Envoi…" : "Envoyer ma candidature"}
          </Button>
        )}
      </div>
    </Card>
  );
}
