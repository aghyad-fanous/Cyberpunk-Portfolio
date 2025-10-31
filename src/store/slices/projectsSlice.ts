// src/store/slices/projectsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Project } from '../types';
import { api } from '../../api/client';

type ProjectsState = {
  projects: Project[];
  status: 'idle' | 'loading' | 'failed';
  error?: string | null;
};

const initialState: ProjectsState = {
  projects: [],
  status: 'idle',
  error: null,
};

export const fetchProjects = createAsyncThunk<Project[]>(
  'projects/fetch',
  async () => {
    const data = await api.get('/api/projects');
    return data as Project[];
  }
);

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = 'idle';
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch projects';
      }),
});

export default projectsSlice.reducer;
