function present(name: string) {
  const value = process.env[name];
  return Boolean(value && value.trim().length > 0);
}

export const env = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  supabaseServiceRole: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
};

export function isSupabaseConfigured() {
  return present("NEXT_PUBLIC_SUPABASE_URL") && present("SUPABASE_SERVICE_ROLE_KEY");
}

export function paymentProviders() {
  return {
    fedapay: present("FEDAPAY_SECRET_KEY"),
    kkiapay: present("KKIAPAY_PUBLIC_KEY") && present("KKIAPAY_PRIVATE_KEY"),
    stripe: present("STRIPE_SECRET_KEY") && present("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"),
    email: present("RESEND_API_KEY"),
  };
}

export function anyPaymentConfigured() {
  const providers = paymentProviders();
  return providers.fedapay || providers.kkiapay || providers.stripe;
}
