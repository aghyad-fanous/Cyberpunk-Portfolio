// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import uiReducer from './slices/uiSlice';
import projectsReducer from './slices/projectsSlice';
import experienceReducer from './slices/experienceSlice';
import articlesReducer from './slices/articlesSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    projects: projectsReducer,
    experience: experienceReducer,
    articles: articlesReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
