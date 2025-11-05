import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../api/client';
import { Article } from '../types';



interface ArticlesState {
  articles: Article[];
  selectedArticle: Article | null;
  loading: boolean;
  error: string | null;
}

const initialState: ArticlesState = {
  articles: [],
  selectedArticle: null,
  loading: false,
  error: null,
};

// ============================
// Async Thunks
// ============================

// Get all blogs
export const fetchArticles = createAsyncThunk<Article[], void>(
  'articles/fetch',
  async () => {
    const data = await api.get('/api/blogs');
    return data as Article[];
  }
);

// Get single blog by slug
export const fetchArticleBySlug = createAsyncThunk<Article, string>(
  'articles/fetchBySlug',
  async (slug) => {
    const data = await api.get(`/api/blogs/${slug}`);
    return data as Article;
  }
);

// Create new blog (admin only)
export const createArticle = createAsyncThunk<Article, Partial<Article>>(
  'articles/create',
  async (payload) => {
    const data = await api.post('/api/blogs/create', payload);
    return data as Article;
  }
);

// Update blog
export const updateArticle = createAsyncThunk<
  Article,
  { id: string; payload: Partial<Article> }
>('articles/update', async ({ id, payload }) => {
  const data = await api.put(`/api/blogs/${id}`, payload);
  return data as Article;
});

// Delete blog
export const deleteArticle = createAsyncThunk<string, string>(
  'articles/delete',
  async (id) => {
    await api.del(`/api/blogs/${id}`);
    return id;
  }
);

// ============================
// Slice
// ============================

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    clearSelectedArticle: (state) => {
      state.selectedArticle = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ========== Fetch all ==========
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action: PayloadAction<Article[]>) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch articles';
      })

      // ========== Fetch by slug ==========
      .addCase(fetchArticleBySlug.fulfilled, (state, action: PayloadAction<Article>) => {
        state.selectedArticle = action.payload;
      })

      // ========== Create ==========
      .addCase(createArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createArticle.fulfilled, (state, action: PayloadAction<Article>) => {
        state.loading = false;
        state.articles.unshift(action.payload);
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create article';
      })

      // ========== Update ==========
      .addCase(updateArticle.fulfilled, (state, action: PayloadAction<Article>) => {
        const idx = state.articles.findIndex((a) => a.id === action.payload.id);
        if (idx >= 0) state.articles[idx] = action.payload;
      })

      // ========== Delete ==========
      .addCase(deleteArticle.fulfilled, (state, action: PayloadAction<string>) => {
        state.articles = state.articles.filter((a) => a.id !== action.payload);
      });
  },
});

export const { clearSelectedArticle } = articlesSlice.actions;
export default articlesSlice.reducer;
