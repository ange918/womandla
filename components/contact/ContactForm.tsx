"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Field, inputClass } from "@/components/site/ui";
import { contactSchema, type ContactInput } from "@/lib/validators";

const profils: { id: ContactInput["profil"]; label: string }[] = [
  { id: "jeune-femme", label: "Jeune femme" },
  { id: "donateur", label: "Don ou parrainage" },
  { id: "partenaire", label: "Partenaire" },
  { id: "presse", label: "Presse" },
  { id: "autre", label: "Autre" },
];

export default function ContactForm() {
  const params = useSearchParams();
  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      nom: "",
      email: "",
      profil: "autre",
      message: "",
      consentement: false,
    },
  });

  useEffect(() => {
    const profil = params.get("profil");
    if (profil && profils.some((item) => item.id === profil)) {
      form.setValue("profil", profil as ContactInput["profil"]);
    }
  }, [form, params]);

  const send = useMutation({
    mutationFn: async (values: ContactInput) => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Envoi impossible.");
      return data as { persisted: boolean; message: string };
    },
    onSuccess: () => form.reset(),
  });

  return (
    <form className="grid gap-4 rounded-[22px] border border-line bg-white p-6 shadow-soft" onSubmit={form.handleSubmit((values) => send.mutate(values))} noValidate>
      <Field id="nom" label="Nom complet" error={form.formState.errors.nom?.message}>
        <input id="nom" className={inputClass} autoComplete="name" aria-invalid={Boolean(form.formState.errors.nom)} {...form.register("nom")} />
      </Field>
      <Field id="email" label="E-mail" error={form.formState.errors.email?.message}>
        <input id="email" type="email" className={inputClass} autoComplete="email" aria-invalid={Boolean(form.formState.errors.email)} {...form.register("email")} />
      </Field>
      <Field id="profil" label="Vous écrivez en tant que" error={form.formState.errors.profil?.message}>
        <select id="profil" className={inputClass} {...form.register("profil")}>
          {profils.map((item) => (
            <option key={item.id} value={item.id}>{item.label}</option>
          ))}
        </select>
      </Field>
      <Field id="message" label="Message" error={form.formState.errors.message?.message}>
        <textarea id="message" rows={5} className={inputClass} aria-invalid={Boolean(form.formState.errors.message)} {...form.register("message")} />
      </Field>
      <label className="flex gap-3 text-sm">
        <input type="checkbox" className="mt-1 accent-primary" {...form.register("consentement")} />
        <span>J’accepte d’être recontactée au sujet de ce message.</span>
      </label>
      {form.formState.errors.consentement ? (
        <p className="text-xs font-semibold text-danger" role="alert">{form.formState.errors.consentement.message}</p>
      ) : null}
      <Button type="submit" disabled={send.isPending}>{send.isPending ? "Envoi…" : "Envoyer le message"}</Button>
      {send.isSuccess ? <p className="text-sm" role="status">{send.data.message}</p> : null}
      {send.isError ? <p className="text-sm font-semibold text-danger" role="alert">{send.error.message}</p> : null}
    </form>
  );
}
