// src/store/slices/projectsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Project } from '../../store/types';
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

// ✅ Get all projects
export const fetchProjects = createAsyncThunk<Project[]>(
  'projects/fetch',
  async () => {
    const data = await api.get('/api/projects');
    return data as Project[];
  }
);

// ✅ Create new project
export const createProject = createAsyncThunk<Project, Partial<Project>>(
  'projects/create',
  async (projectData) => {
    const data = await api.post('/api/projects', projectData);
    return data as Project;
  }
);

// ✅ Update project
export const updateProject = createAsyncThunk<Project, { id: string; updates: Partial<Project> }>(
  'projects/update',
  async ({ id, updates }) => {
    const data = await api.put(`/api/projects/${id}`, updates);
    return data as Project;
  }
);

// ✅ Delete project
export const deleteProject = createAsyncThunk<string, string>(
  'projects/delete',
  async (id) => {
    await api.del(`/api/projects/${id}`);
    return id;
  }
);

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // FETCH
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
      })
      // CREATE
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to create project';
      })
      // UPDATE
      .addCase(updateProject.fulfilled, (state, action) => {
        const index = state.projects.findIndex(p => p.id === action.payload.id);
        if (index !== -1) state.projects[index] = action.payload;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to update project';
      })
      // DELETE
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(p => p.id !== action.payload);
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to delete project';
      }),
});

export default projectsSlice.reducer;
