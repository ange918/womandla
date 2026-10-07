"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { newsletterSchema } from "@/lib/validators";
import { inputClass } from "@/components/site/ui";
import { z } from "zod";

type Values = z.infer<typeof newsletterSchema>;

export default function NewsletterForm() {
  const form = useForm<Values>({ resolver: zodResolver(newsletterSchema), defaultValues: { email: "" } });
  const mutation = useMutation({
    mutationFn: async (values: Values) => {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Envoi impossible.");
      return data as { persisted: boolean };
    },
    onSuccess: () => form.reset(),
  });

  return (
    <form
      className="flex flex-col gap-3 sm:flex-row"
      onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
      noValidate
    >
      <div className="flex-1">
        <label htmlFor="newsletter-email" className="sr-only">
          Adresse e-mail
        </label>
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          placeholder="Votre adresse e-mail"
          className={inputClass}
          aria-invalid={Boolean(form.formState.errors.email)}
          {...form.register("email")}
        />
        {form.formState.errors.email ? (
          <p className="mt-1 text-xs font-semibold text-red-200" role="alert">
            {form.formState.errors.email.message}
          </p>
        ) : null}
      </div>
      <button
        type="submit"
        disabled={mutation.isPending}
        className="rounded-full bg-gold px-5 py-3 text-sm font-extrabold text-dark disabled:opacity-60"
      >
        {mutation.isPending ? "Envoi…" : "S’inscrire"}
      </button>
      {mutation.isSuccess ? (
        <p className="text-sm text-white sm:basis-full" role="status">
          {mutation.data.persisted
            ? "Inscription enregistrée."
            : "Supabase n’est pas configuré : l’adresse n’a pas été enregistrée. Écrivez à contact@womandla.bj."}
        </p>
      ) : null}
      {mutation.isError ? (
        <p className="text-sm text-red-200 sm:basis-full" role="alert">
          {mutation.error.message}
        </p>
      ) : null}
    </form>
  );
}
