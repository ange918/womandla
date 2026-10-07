"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { donationAmounts, faq, supportBenefits, supportOptions } from "@/lib/content";
import { formatFcfa, cn, fr } from "@/lib/utils";
import { donationSchema, type DonationInput } from "@/lib/validators";
import { Button, Card, Field, inputClass } from "@/components/site/ui";
import FaqAccordion from "@/components/site/FaqAccordion";

const steps = ["Type de don", "Montant", "Vos informations", "Paiement"];

const types = [
  { id: "ponctuel" as const, title: "Don ponctuel", text: supportOptions[0].text },
  { id: "mensuel" as const, title: "Don mensuel", text: "Le même texte du site prévoit aussi une contribution mensuelle, sans montant imposé." },
  { id: "parrainage" as const, title: "Parrainage", text: supportOptions[1].text },
];

const methods = [
  { id: "fedapay" as const, title: "FedaPay", text: "Mobile Money local (MTN, Moov, Celtiis, Wave) — stub, sans clé réelle." },
  { id: "kkiapay" as const, title: "Kkiapay", text: "Alternative Mobile Money — stub, sans clé réelle." },
  { id: "stripe" as const, title: "Stripe", text: "Carte internationale via PaymentIntent — stub, sans clé réelle." },
];

export default function DonWizard() {
  const params = useSearchParams();
  const router = useRouter();
  const initialType = params.get("type");
  const initialAmount = Number(params.get("montant"));
  const [step, setStep] = useState(0);
  const [type, setType] = useState<DonationInput["type"]>(
    initialType === "mensuel" || initialType === "parrainage" || initialType === "ponctuel" ? initialType : "ponctuel",
  );
  const [montant, setMontant] = useState(donationAmounts.includes(initialAmount) ? initialAmount : 15_000);
  const [custom, setCustom] = useState("");
  const [moyen, setMoyen] = useState<DonationInput["moyen"]>("fedapay");

  const status = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const response = await fetch("/api/dons");
      if (!response.ok) throw new Error("Statut indisponible");
      return response.json() as Promise<{
        providers: { fedapay: boolean; kkiapay: boolean; stripe: boolean };
        mode: string;
      }>;
    },
  });

  const form = useForm<Pick<DonationInput, "nom" | "email" | "telephone" | "pays">>({
    resolver: zodResolver(donationSchema.pick({ nom: true, email: true, telephone: true, pays: true })),
    defaultValues: { nom: "", email: "", telephone: "", pays: "Bénin" },
  });

  const amountValue = useMemo(() => {
    const parsed = Number(custom.replace(/\s/g, ""));
    return custom ? parsed : montant;
  }, [custom, montant]);

  const submit = useMutation({
    mutationFn: async () => {
      const infos = form.getValues();
      const payload: DonationInput = { type, montant: amountValue, moyen, ...infos };
      const parsed = donationSchema.safeParse(payload);
      if (!parsed.success) {
        throw new Error(parsed.error.issues[0]?.message ?? "Formulaire incomplet.");
      }
      const response = await fetch("/api/dons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Enregistrement impossible.");
      return data as {
        reference: string;
        persisted: boolean;
        payment: { enabled: boolean; message: string; status: string };
        don: DonationInput;
      };
    },
    onSuccess: (data) => {
      sessionStorage.setItem("womandla-don", JSON.stringify(data));
      router.push(`/don/confirmation?ref=${encodeURIComponent(data.reference)}`);
    },
  });

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <Card className="p-6 md:p-8">
        <ol className="mb-8 flex items-center gap-2" aria-label="Étapes du don">
          {steps.map((label, index) => (
            <li key={label} className="flex flex-1 items-center gap-2">
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-sm font-extrabold",
                  index === step && "bg-primary text-white",
                  index < step && "bg-soft text-primary",
                  index > step && "border border-line bg-pale text-muted",
                )}
              >
                {index + 1}
              </span>
              <span className="hidden text-xs font-bold text-muted sm:inline">{label}</span>
              {index < steps.length - 1 ? <span className={cn("h-0.5 flex-1", index < step ? "bg-primary" : "bg-line")} /> : null}
            </li>
          ))}
        </ol>

        {step === 0 ? (
          <fieldset>
            <legend className="font-display text-2xl font-extrabold">Comment souhaitez-vous soutenir ?</legend>
            <div className="mt-5 grid gap-3">
              {types.map((item) => (
                <label
                  key={item.id}
                  className={cn(
                    "block cursor-pointer rounded-[18px] border-2 p-4",
                    type === item.id ? "border-primary bg-pale shadow-[0_0_0_3px_rgba(75,46,131,0.12)]" : "border-line",
                  )}
                >
                  <span className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="type-don"
                      className="mt-1 accent-primary"
                      checked={type === item.id}
                      onChange={() => setType(item.id)}
                    />
                    <span>
                      <span className="block font-bold">{item.title}</span>
                      <span className="mt-1 block text-sm text-muted">{fr(item.text)}</span>
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        ) : null}

        {step === 1 ? (
          <fieldset>
            <legend className="font-display text-2xl font-extrabold">Quel montant ?</legend>
            <p className="mt-2 text-sm text-muted">
              Montants proposés pour le parcours. Aucune équivalence (« X FCFA = une formation ») n’est publiée sur le site actuel.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {donationAmounts.map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={!custom && montant === value}
                  onClick={() => {
                    setMontant(value);
                    setCustom("");
                  }}
                  className={cn(
                    "rounded-[18px] border-2 px-3 py-5 text-center font-display text-lg font-extrabold",
                    !custom && montant === value ? "border-gold bg-[#FCF9EF]" : "border-line bg-white",
                  )}
                >
                  {formatFcfa(value)}
                </button>
              ))}
            </div>
            <div className="mt-4">
            <Field id="montant-libre" label="Ou un autre montant (FCFA)">
              <input
                id="montant-libre"
                inputMode="numeric"
                className={inputClass}
                value={custom}
                onChange={(event) => setCustom(event.target.value)}
                placeholder="Ex. 25000"
              />
            </Field>
            </div>
            {amountValue < 1000 ? <p className="mt-2 text-xs font-semibold text-danger">Le montant minimum est de 1 000 FCFA.</p> : null}
          </fieldset>
        ) : null}

        {step === 2 ? (
          <form id="donateur" className="grid gap-4" onSubmit={form.handleSubmit(() => setStep(3))} noValidate>
            <h2 className="font-display text-2xl font-extrabold">Vos informations</h2>
            <Field id="nom" label="Nom complet" error={form.formState.errors.nom?.message}>
              <input id="nom" className={inputClass} autoComplete="name" aria-invalid={Boolean(form.formState.errors.nom)} {...form.register("nom")} />
            </Field>
            <Field id="email" label="E-mail" error={form.formState.errors.email?.message}>
              <input id="email" type="email" className={inputClass} autoComplete="email" aria-invalid={Boolean(form.formState.errors.email)} {...form.register("email")} />
            </Field>
            <Field id="telephone" label="Téléphone (facultatif)" error={form.formState.errors.telephone?.message}>
              <input id="telephone" type="tel" className={inputClass} autoComplete="tel" placeholder="+229 …" aria-invalid={Boolean(form.formState.errors.telephone)} {...form.register("telephone")} />
            </Field>
            <Field id="pays" label="Pays" error={form.formState.errors.pays?.message}>
              <input id="pays" className={inputClass} autoComplete="country-name" aria-invalid={Boolean(form.formState.errors.pays)} {...form.register("pays")} />
            </Field>
          </form>
        ) : null}

        {step === 3 ? (
          <fieldset>
            <legend className="font-display text-2xl font-extrabold">Paiement</legend>
            <p className="mt-2 text-sm text-muted">
              {status.data?.mode === "disabled"
                ? "Aucun prestataire n’est configuré. Vous pouvez enregistrer une intention : aucun argent ne sera débité."
                : "Les clés présentes activent seulement le stub. Aucun débit réel n’est lancé."}
            </p>
            <div className="mt-5 grid gap-3">
              {methods.map((item) => {
                const ready = status.data?.providers[item.id];
                return (
                  <label
                    key={item.id}
                    className={cn(
                      "block cursor-pointer rounded-[18px] border-2 p-4",
                      moyen === item.id ? "border-primary bg-pale" : "border-line",
                    )}
                  >
                    <span className="flex items-start gap-3">
                      <input type="radio" name="moyen" className="mt-1 accent-primary" checked={moyen === item.id} onChange={() => setMoyen(item.id)} />
                      <span>
                        <span className="font-bold">{item.title}</span>
                        <span className={cn("ml-2 rounded-full px-2 py-0.5 text-[11px] font-bold", ready ? "bg-soft text-primary" : "bg-sun-soft text-gold-deep")}>
                          {ready ? "Clé détectée · stub" : "Non configuré"}
                        </span>
                        <span className="mt-1 block text-sm text-muted">{item.text}</span>
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
            {submit.isError ? <p className="mt-3 text-sm font-semibold text-danger" role="alert">{submit.error.message}</p> : null}
          </fieldset>
        ) : null}

        <div className="mt-8 flex flex-wrap justify-between gap-3">
          <Button type="button" variant="secondary" onClick={() => setStep((value) => Math.max(0, value - 1))} disabled={step === 0}>
            Retour
          </Button>
          {step < 2 ? (
            <Button type="button" onClick={() => amountValue >= 1000 && setStep((value) => value + 1)} disabled={step === 1 && amountValue < 1000}>
              Continuer
            </Button>
          ) : null}
          {step === 2 ? (
            <Button type="submit" form="donateur">
              Continuer
            </Button>
          ) : null}
          {step === 3 ? (
            <Button type="button" variant="sun" disabled={submit.isPending} onClick={() => submit.mutate()}>
              {submit.isPending ? "Enregistrement…" : "Confirmer sans débiter"}
            </Button>
          ) : null}
        </div>
      </Card>

      <aside className="space-y-4">
        <Card className="bg-sun-soft p-5">
          <p className="eyebrow text-gold-deep">Votre choix</p>
          <p className="mt-2 font-display text-3xl font-extrabold text-ink">{Number.isFinite(amountValue) ? formatFcfa(amountValue) : "—"}</p>
          <p className="text-sm text-muted">{types.find((item) => item.id === type)?.title}</p>
        </Card>
        <Card className="p-5">
          <h2 className="font-display text-lg font-extrabold">Ce que le site dit déjà</h2>
          <ul className="mt-3 space-y-3 text-sm text-muted">
            {supportBenefits.map((item) => (
              <li key={item.title}>
                <span className="font-bold text-ink">{item.title}. </span>
                {item.text}
              </li>
            ))}
          </ul>
        </Card>
        <Card className="p-5">
          <h2 className="mb-2 font-display text-lg font-extrabold">Questions</h2>
          <FaqAccordion items={faq} />
        </Card>
      </aside>
    </div>
  );
}
