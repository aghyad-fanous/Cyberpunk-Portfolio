// src/store/slices/articlesSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { Article } from '../types';
import { api } from '../../api/client';

type Filter = {
  search: string;
  tag?: string | null;
  locale?: 'en' | 'ar' | null;
  publishedOnly?: boolean;
};

type ArticlesState = {
  articles: Article[];
  status: 'idle' | 'loading' | 'failed';
  error?: string | null;
  filter: Filter;
};

const initialState: ArticlesState = {
  articles: [],
  status: 'idle',
  error: null,
  filter: {
    search: '',
    tag: null,
    locale: null,
    publishedOnly: true,
  },
};

export const fetchArticles = createAsyncThunk<Article[], void>(
  'articles/fetch',
  async () => {
    const data = await api.get('/api/articles');
    return data as Article[];
  }
);

export const createArticle = createAsyncThunk<Article, Partial<Article>>(
  'articles/create',
  async (payload) => {
    const data = await api.post('/api/articles', payload);
    return data as Article;
  }
);

export const updateArticle = createAsyncThunk<
  Article,
  { id: string; payload: Partial<Article> }
>('articles/update', async ({ id, payload }) => {
  const data = await api.put(`/api/articles/${id}`, payload);
  return data as Article;
});

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.filter.search = action.payload;
    },
    setTag: (state, action: PayloadAction<string | null>) => {
      state.filter.tag = action.payload;
    },
    setLocaleFilter: (state, action: PayloadAction<'en' | 'ar' | null>) => {
      state.filter.locale = action.payload;
    },
    setPublishedOnly: (state, action: PayloadAction<boolean>) => {
      state.filter.publishedOnly = action.payload;
    },
    clearFilters: (state) => {
      state.filter = { search: '', tag: null, locale: null, publishedOnly: true };
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'idle';
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch articles';
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.articles.unshift(action.payload);
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        const idx = state.articles.findIndex((a) => a._id === action.payload._id);
        if (idx >= 0) state.articles[idx] = action.payload;
      }),
});

export const {
  setSearch,
  setTag,
  setLocaleFilter,
  setPublishedOnly,
  clearFilters,
} = articlesSlice.actions;

export const selectFilteredArticles = (state: { articles: ArticlesState }) => {
  const { articles, filter } = state.articles;
  const search = filter.search.trim().toLowerCase();

  return articles.filter((a) => {
    if (filter.publishedOnly && !a.published) return false;
    if (filter.locale && a.locale && filter.locale !== a.locale) return false;
    if (filter.tag && (!a.tags || !a.tags.includes(filter.tag))) return false;
    if (!search) return true;
    const inTitle = a.title?.toLowerCase().includes(search);
    const inExcerpt = a.excerpt?.toLowerCase().includes(search);
    return Boolean(inTitle || inExcerpt);
  });
};

export default articlesSlice.reducer;
