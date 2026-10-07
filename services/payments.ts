import { anyPaymentConfigured, paymentProviders } from "@/lib/env";

export type PaymentMethod = "fedapay" | "kkiapay" | "stripe";

export type PaymentIntentResult = {
  enabled: boolean;
  method: PaymentMethod;
  status: "paiement_desactive" | "pret_a_brancher";
  message: string;
  providerRef: string | null;
};

const LABELS: Record<PaymentMethod, string> = {
  fedapay: "FedaPay (Mobile Money)",
  kkiapay: "Kkiapay (Mobile Money)",
  stripe: "Stripe (carte internationale)",
};

/**
 * Prépare un paiement sans débiter.
 * Tant que la clé du prestataire est absente, le parcours reste utilisable
 * et le don est enregistré comme intention, jamais comme paiement réussi.
 */
export function createPaymentIntent(method: PaymentMethod, reference: string): PaymentIntentResult {
  const providers = paymentProviders();
  const enabled = providers[method];

  if (!enabled) {
    return {
      enabled: false,
      method,
      status: "paiement_desactive",
      providerRef: null,
      message: `${LABELS[method]} n’est pas configuré. Aucun débit n’a été effectué. Le don ${reference} est enregistré comme intention.`,
    };
  }

  return {
    enabled: true,
    method,
    status: "pret_a_brancher",
    providerRef: null,
    message: `${LABELS[method]} est configuré, mais l’appel prestataire reste un stub : aucun PaymentIntent réel n’est créé dans cette version.`,
  };
}

export function paymentStatusPayload() {
  const providers = paymentProviders();
  return {
    configured: anyPaymentConfigured(),
    providers,
    mode: anyPaymentConfigured() ? "stub" : "disabled",
  };
}
