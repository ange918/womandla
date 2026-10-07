"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { phonesMatch } from "@/lib/dossier";
import { suiviSchema } from "@/lib/validators";
import { cn } from "@/lib/utils";
import { Button, Card, Field, inputClass } from "@/components/site/ui";
import { z } from "zod";

type Values = z.infer<typeof suiviSchema>;

const STATUTS = [
  { id: "recue", label: "Reçue" },
  { id: "en_etude", label: "En étude" },
  { id: "entretien", label: "Entretien" },
  { id: "retenue", label: "Retenue" },
] as const;

type RecordView = {
  numero_dossier: string;
  statut: string;
  prenom: string;
  commune: string;
  entretien_at: string | null;
  persisted: boolean;
  evenements: { type: string; message: string | null; statut: string | null; created_at: string }[];
  telephone?: string;
};

function readLocal(numero: string, telephone: string) {
  const raw = localStorage.getItem("womandla-candidatures-locales");
  if (!raw) return null;
  try {
    const rows = JSON.parse(raw) as RecordView[];
    return (
      rows.find(
        (row) => row.numero_dossier?.toUpperCase() === numero.toUpperCase() && row.telephone && phonesMatch(row.telephone, telephone),
      ) ?? null
    );
  } catch {
    return null;
  }
}

export default function SuiviCandidature() {
  const params = useSearchParams();
  const form = useForm<Values>({
    resolver: zodResolver(suiviSchema),
    defaultValues: { numero: "", telephone: "" },
  });

  useEffect(() => {
    const dossier = params.get("dossier");
    if (dossier) form.setValue("numero", dossier);
  }, [form, params]);

  const search = useMutation({
    mutationFn: async (values: Values) => {
      const response = await fetch("/api/candidatures/suivi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Recherche impossible.");
      if (data.record) return { source: "serveur" as const, record: data.record as RecordView, configured: true };
      const local = readLocal(values.numero, values.telephone);
      if (local) return { source: "navigateur" as const, record: local, configured: data.configured as boolean };
      return { source: "absent" as const, record: null, configured: data.configured as boolean };
    },
  });

  const record = search.data?.record ?? null;
  const activeIndex = STATUTS.findIndex((item) => item.id === record?.statut);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <Card className="p-6">
        <h2 className="font-display text-2xl font-extrabold">Rechercher un dossier</h2>
        <p className="mt-2 text-sm text-muted">Le numéro de dossier et le téléphone saisis à la candidature. Aucune donnée n’est listée publiquement.</p>
        <form className="mt-5 grid gap-4" onSubmit={form.handleSubmit((values) => search.mutate(values))} noValidate>
          <Field id="numero" label="Numéro de dossier" error={form.formState.errors.numero?.message}>
            <input id="numero" className={inputClass} placeholder="WMD-26-BOH-0317" aria-invalid={Boolean(form.formState.errors.numero)} {...form.register("numero")} />
          </Field>
          <Field id="telephone-suivi" label="Téléphone" error={form.formState.errors.telephone?.message}>
            <input id="telephone-suivi" type="tel" className={inputClass} aria-invalid={Boolean(form.formState.errors.telephone)} {...form.register("telephone")} />
          </Field>
          <Button type="submit" disabled={search.isPending}>
            {search.isPending ? "Recherche…" : "Consulter"}
          </Button>
          {search.isError ? <p className="text-sm font-semibold text-danger" role="alert">{search.error.message}</p> : null}
        </form>
      </Card>

      <Card className="p-6">
        {!search.data ? <p className="text-sm text-muted">Le statut s’affichera ici.</p> : null}
        {search.data?.source === "absent" ? (
          <p className="text-sm text-muted" role="status">
            {search.data.configured
              ? "Aucun dossier ne correspond à ce couple numéro / téléphone."
              : "Supabase n’est pas configuré et ce navigateur ne connaît pas ce dossier. Déposez une candidature sur cet appareil, ou branchez la base pour un suivi partagé."}
          </p>
        ) : null}
        {record ? (
          <div>
            <p className="eyebrow text-primary">{record.numero_dossier}</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold">Dossier de {record.prenom}</h2>
            <p className="text-sm text-muted">{record.commune}</p>
            {search.data?.source === "navigateur" ? (
              <p className="mt-3 rounded-2xl bg-sun-soft p-3 text-xs text-gold-deep">
                Suivi local à ce navigateur. Il ne sera pas visible sur un autre téléphone tant que Supabase n’enregistre pas les dossiers.
              </p>
            ) : null}
            <ol className="mt-6 space-y-3">
              {STATUTS.map((item, index) => {
                const done = activeIndex >= index && activeIndex !== -1;
                const current = activeIndex === index;
                return (
                  <li key={item.id} className="flex items-center gap-3">
                    <span className={cn("flex h-8 w-8 items-center justify-center rounded-full text-xs font-extrabold", done ? "bg-primary text-white" : "bg-pale text-muted", current && "ring-2 ring-gold")}>
                      {done ? "✓" : index + 1}
                    </span>
                    <span className="font-bold">{item.label}</span>
                    {current ? <span className="rounded-full bg-soft px-2 py-0.5 text-[11px] font-bold text-primary">En cours</span> : null}
                  </li>
                );
              })}
            </ol>
            {record.statut === "liste_attente" || record.statut === "non_retenue" ? (
              <p className="mt-4 text-sm font-semibold">Statut enregistré : {record.statut.replace("_", " ")}.</p>
            ) : null}
            {record.entretien_at ? (
              <p className="mt-4 rounded-2xl bg-pale p-4 text-sm">
                Entretien prévu le {new Date(record.entretien_at).toLocaleString("fr-FR")}. Le lieu et les pièces à apporter seront précisés par l’équipe : ils ne sont pas inventés ici.
              </p>
            ) : (
              <p className="mt-4 text-sm text-muted">Aucune convocation n’est enregistrée pour ce dossier.</p>
            )}
            <h3 className="mt-6 font-display text-lg font-extrabold">Historique</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {record.evenements?.length ? (
                record.evenements.map((event, index) => (
                  <li key={`${event.created_at}-${index}`} className="rounded-2xl border border-line p-3">
                    <p className="font-semibold">{event.message ?? event.statut}</p>
                    <p className="text-xs text-muted">{new Date(event.created_at).toLocaleString("fr-FR")}</p>
                  </li>
                ))
              ) : (
                <li className="text-muted">Pas encore de message.</li>
              )}
            </ul>
          </div>
        ) : null}
      </Card>
    </div>
  );
}
