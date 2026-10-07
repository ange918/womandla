import Link from "next/link";
import { cn, fr } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("mx-auto w-full max-w-6xl px-5 md:px-8", className)}>{children}</div>;
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("eyebrow text-primary mb-3", className)}>{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("mb-10 max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? <Eyebrow className={align === "center" ? "justify-center" : undefined}>{eyebrow}</Eyebrow> : null}
      <h2 className="font-display text-3xl font-extrabold leading-tight text-ink md:text-4xl">{fr(title)}</h2>
      {text ? <p className="mt-3 text-base leading-relaxed text-muted md:text-[17px]">{fr(text)}</p> : null}
    </div>
  );
}

const buttonStyles = {
  sun: "bg-gold text-dark shadow-sun hover:brightness-105",
  primary: "bg-primary text-white shadow-glow hover:bg-secondary",
  ghost: "border-[1.5px] border-primary bg-transparent text-primary hover:bg-soft",
  secondary: "border-[1.5px] border-line bg-white text-ink hover:border-primary",
  dark: "bg-dark text-white hover:bg-ink",
} as const;

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
}: {
  href: string;
  variant?: keyof typeof buttonStyles;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition",
        buttonStyles[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof buttonStyles }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-60",
        buttonStyles[variant],
        className,
      )}
      {...props}
    />
  );
}

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("rounded-[22px] border border-line bg-white shadow-soft", className)}>{children}</div>
  );
}

export function EmptyState({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <Card className="border-dashed bg-pale p-8">
      <p className="font-display text-lg font-extrabold text-ink">{fr(title)}</p>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{fr(text)}</p>
    </Card>
  );
}

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div>
      {items.map((item) => (
        <details key={item.q} className="group border-b border-line py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold text-ink">
            {fr(item.q)}
            <span aria-hidden className="text-primary transition group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{fr(item.a)}</p>
        </details>
      ))}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  text,
  actions,
}: {
  eyebrow: string;
  title: string;
  text: string;
  actions?: React.ReactNode;
}) {
  return (
    <section className="mesh border-b border-line">
      <Container className="py-14 md:py-20">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.08] text-ink md:text-5xl">
          {fr(title)}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{fr(text)}</p>
        {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
      </Container>
    </section>
  );
}

export function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-bold text-muted">
        {label}
      </label>
      {children}
      {hint && !error ? <p className="mt-1.5 text-[11.5px] text-muted">{hint}</p> : null}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-semibold text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export const inputClass =
  "w-full rounded-[14px] border-[1.5px] border-line bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-primary focus:shadow-[0_0_0_3px_rgba(75,46,131,0.15)] aria-[invalid=true]:border-danger aria-[invalid=true]:shadow-[0_0_0_3px_rgba(220,38,38,0.12)]";
