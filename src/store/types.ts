// src/store/types.ts
export type Language = 'en' | 'ar';

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  thumbnail?: string | null;
  category: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

// src/types.ts
export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[]; // من Prisma schema
  image?: string;
  liveUrl?: string;
  codeUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  ownerId?: string;
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
