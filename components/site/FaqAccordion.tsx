"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { fr } from "@/lib/utils";

export default function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  return (
    <Accordion.Root type="single" collapsible className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <Accordion.Item key={item.q} value={item.q}>
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 py-4 text-left font-display text-lg font-bold text-ink">
              {fr(item.q)}
              <span aria-hidden className="text-primary transition group-data-[state=open]:rotate-45">
                +
              </span>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=closed]:animate-none">
            <p className="max-w-3xl pb-4 text-sm leading-relaxed text-muted">{fr(item.a)}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
