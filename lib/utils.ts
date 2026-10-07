import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Typographie française : insécables avant ? ! : ; % » et dans les milliers. */
export function fr(value: string) {
  return value
    .replace(/ (?=[?!:;%»])/g, "\u00a0")
    .replace(/« /g, "«\u00a0")
    .replace(/(\d) (\d{3})(?!\d)/g, "$1\u00a0$2");
}

export function formatFcfa(amount: number) {
  return `${new Intl.NumberFormat("fr-FR").format(amount)}\u00a0FCFA`;
}
