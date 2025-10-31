// src/store/types.ts
export type Language = 'en' | 'ar';

export type Article = {
  _id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  authorId?: string;
  tags?: string[];
  locale?: Language;
  published?: boolean;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Project = {
  id: string;
  title: string;
  description?: string;
  tech?: string[];
  image?: string;
  liveUrl?: string;
  codeUrl?: string;
};

export type Experience = {
  id: string;
  title: string;
  company?: string;
  from?: string;
  to?: string | null;
  description?: string;
  locale?: Language;
};
