export type Article = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: string[];
};

/**
 * Liste volontairement vide.
 * Ajouter ici uniquement des articles validés par l’équipe.
 */
export const articles: Article[] = [];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug) ?? null;
}
