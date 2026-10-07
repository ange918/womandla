"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { donationAmounts } from "@/lib/content";
import { formatFcfa } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function DonExpress() {
  const router = useRouter();
  const [amount, setAmount] = useState(15_000);

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {donationAmounts.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setAmount(value)}
            className={cn(
              "rounded-[18px] border-2 bg-white px-3 py-4 text-center",
              amount === value ? "border-gold bg-[#FCF9EF] shadow-[0_0_0_3px_rgba(201,162,39,0.18)]" : "border-line",
            )}
            aria-pressed={amount === value}
          >
            <span className="font-display text-lg font-extrabold text-ink">{formatFcfa(value)}</span>
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => router.push(`/don?type=ponctuel&montant=${amount}`)}
        className="mt-5 inline-flex rounded-full bg-gold px-5 py-3 text-sm font-extrabold text-dark shadow-sun"
      >
        Continuer avec {formatFcfa(amount)}
      </button>
      <p className="mt-3 text-xs text-white/70">
        Aucune équivalence d’impact n’est publiée sur le site actuel. Le montant ne déclenche pas de paiement
        tant que FedaPay, Kkiapay ou Stripe ne sont pas configurés.
      </p>
    </div>
  );
}
