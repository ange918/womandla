import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import NewsletterForm from "@/components/site/NewsletterForm";
import { ButtonLink, Container } from "@/components/site/ui";
import { articles, getArticle } from "@/lib/articles";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  return { title: article?.title ?? "Article introuvable" };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <article className="bg-white">
      <Container className="grid gap-10 py-14 lg:grid-cols-[1fr_280px]">
        <div>
          <p className="text-sm text-muted">{article.date}</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold">{article.title}</h1>
          <p className="mt-4 text-lg text-muted">{article.excerpt}</p>
          <div className="prose mt-8 max-w-none space-y-4 text-ink">
            {article.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <aside className="h-fit rounded-[22px] border border-line p-5 lg:sticky lg:top-24">
          <p className="font-display text-lg font-extrabold">Agir</p>
          <div className="mt-4 flex flex-col gap-2">
            <ButtonLink href="/don" variant="sun">Faire un don</ButtonLink>
            <ButtonLink href="/postuler" variant="ghost">Se faire accompagner</ButtonLink>
          </div>
        </aside>
      </Container>
      <section className="bg-dark py-12 text-white">
        <Container>
          <h2 className="mb-4 font-display text-2xl font-extrabold">Newsletter</h2>
          <NewsletterForm />
          <Link href="/actualites" className="mt-6 inline-block text-sm font-bold text-gold">
            Toutes les actualités
          </Link>
        </Container>
      </section>
    </article>
  );
}
