// src/store/slices/experienceSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Experience } from '../types';
import { api } from '../../api/client';

type ExperienceState = {
  experiences: Experience[];
  status: 'idle' | 'loading' | 'failed';
  error?: string | null;
};

const initialState: ExperienceState = {
  experiences: [],
  status: 'idle',
  error: null,
};

export const fetchExperiences = createAsyncThunk<Experience[]>(
  'experience/fetch',
  async () => {
    const data = await api.get('/api/experiences');
    return data as Experience[];
  }
);

export const experienceSlice = createSlice({
  name: 'experience',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchExperiences.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExperiences.fulfilled, (state, action) => {
        state.status = 'idle';
        state.experiences = action.payload;
      })
      .addCase(fetchExperiences.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch experiences';
      }),
});

export default experienceSlice.reducer;
