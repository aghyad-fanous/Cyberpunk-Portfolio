// src/store/slices/uiSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Language } from '../types';

type UIState = {
  darkMode: boolean;
  language: Language;
};

const initialState: UIState = {
  darkMode: true,
  language: 'en',
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
  },
});

export const { toggleDarkMode, setDarkMode, setLanguage } = uiSlice.actions;
export default uiSlice.reducer;
