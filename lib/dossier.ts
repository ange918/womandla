const COMMUNE_CODES: Record<string, string> = {
  bohicon: "BOH",
  cotonou: "COT",
  parakou: "PAR",
  ouidah: "OUI",
  porto: "PNO",
  "porto-novo": "PNO",
  bembereke: "BEM",
  "bembèrèkè": "BEM",
  klouekanme: "KLO",
  "klouékanmè": "KLO",
  ketou: "KET",
  kétou: "KET",
};

export function communeCode(commune: string) {
  const key = commune
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  if (COMMUNE_CODES[commune.trim().toLowerCase()]) {
    return COMMUNE_CODES[commune.trim().toLowerCase()];
  }
  if (COMMUNE_CODES[key]) return COMMUNE_CODES[key];
  const letters = key.replace(/[^a-z]/g, "").slice(0, 3).toUpperCase();
  return (letters + "XXX").slice(0, 3);
}

export function buildDossierNumber(commune: string, year = new Date().getFullYear()) {
  const yy = String(year).slice(-2);
  const serial = String(Math.floor(Math.random() * 10000)).padStart(4, "0");
  return `WMD-${yy}-${communeCode(commune)}-${serial}`;
}

export function buildDonationReference(year = new Date().getFullYear()) {
  const serial = String(Math.floor(Math.random() * 100000)).padStart(5, "0");
  return `DON-${year}-${serial}`;
}

export function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.startsWith("229")) return digits;
  if (digits.startsWith("00229")) return digits.slice(2);
  return `229${digits}`;
}

export function phonesMatch(a: string, b: string) {
  return normalizePhone(a) === normalizePhone(b);
}
