// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import projectsReducer from './slices/projectsSlice';
import experienceReducer from './slices/experienceSlice';
import articlesReducer from './slices/articlesSlice';
import contactReducer from './slices/contactSlice';
import authReducer from "./slices/authSlice"

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    projects: projectsReducer,
    experience: experienceReducer,
    articles: articlesReducer,
    contact: contactReducer,
    authSlice: authReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
