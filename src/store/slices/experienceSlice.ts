// src/store/slices/experienceSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Experience } from '../types'; // تأكد من المسار الصحيح لنوع Experience
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

// =======================================================
//                   ✅ ASYNC THUNKS (API Calls)
// =======================================================

// 1. جلب جميع الخبرات (Fetch All)
export const fetchExperiences = createAsyncThunk<Experience[]>(
  'experience/fetch',
  async () => {
    // استخدم المسار الذي حددناه في الـ Backend
    const data = await api.get('/api/experience');
    return data as Experience[];
  }
);

// 2. إنشاء خبرة جديدة (Create)
// يستقبل البيانات الجزئية للخبرة، ويعيد الخبرة الكاملة من الخادم
export const createExperience = createAsyncThunk<Experience, Partial<Experience>>(
  'experience/create',
  async (experienceData) => {
    const data = await api.post('/api/experience', experienceData);
    return data as Experience;
  }
);

// 3. تعديل خبرة (Update)
// يستقبل id الخبرة والتحديثات، ويعيد الخبرة المحدثة
export const updateExperience = createAsyncThunk<Experience, { id: string; updates: Partial<Experience> }>(
  'experience/update',
  async ({ id, updates }) => {
    const data = await api.put(`/api/experience/${id}`, updates);
    return data as Experience;
  }
);

// 4. حذف خبرة (Delete)
// يستقبل id الخبرة، ويعيد id الخبرة المحذوفة
export const deleteExperience = createAsyncThunk<string, string>(
  'experience/delete',
  async (id) => {
    await api.del(`/api/experience/${id}`);
    return id; // نعيد الـ id لحذفه من الـ Redux State
  }
);

// =======================================================
//                   ✅ SLICE & REDUCERS
// =======================================================

export const experienceSlice = createSlice({
  name: 'experience',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // ----------------- FETCH -----------------
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
      })
      // ----------------- CREATE -----------------
      .addCase(createExperience.fulfilled, (state, action) => {
        // إضافة الخبرة الجديدة إلى بداية القائمة (اختياري، يمكنك استخدام push)
        state.experiences.unshift(action.payload);
        state.error = null; // مسح أي خطأ سابق
      })
      .addCase(createExperience.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to create experience';
      })
      // ----------------- UPDATE -----------------
      .addCase(updateExperience.fulfilled, (state, action) => {
        const index = state.experiences.findIndex(e => e.id === action.payload.id);
        if (index !== -1) {
          state.experiences[index] = action.payload; // تحديث الخبرة
        }
        state.error = null;
      })
      .addCase(updateExperience.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to update experience';
      })
      // ----------------- DELETE -----------------
      .addCase(deleteExperience.fulfilled, (state, action) => {
        // إزالة الخبرة من المصفوفة باستخدام الـ id المعاد (action.payload)
        state.experiences = state.experiences.filter(e => e.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteExperience.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to delete experience';
      }),
});

export default experienceSlice.reducer;

