import type { Locale } from './i18n';

export type NewsletterPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  locale: Locale;
  author: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  cover: string;
  coverAlt: string;
  readingMinutes: number;
};

export type NewsletterArticle = NewsletterPost & {
  availableLocales: Locale[];
  html: string;
  headings: { id: string; text: string; level: number }[];
};

export type NewsletterPage = {
  items: NewsletterPost[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type NewsletterTag = { slug: string; count: number };
