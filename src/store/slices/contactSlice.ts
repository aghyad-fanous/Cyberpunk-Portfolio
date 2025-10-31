import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import emailjs from '@emailjs/browser';

export interface ContactFormData {
  to_email: string;     // ✅ مضافة حديثاً
  subject: string;
  message: string;
  reply_to: string;
  name: string;
}


interface ContactState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: ContactState = {
  loading: false,
  success: false,
  error: null,
};

const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID || ''; 
const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''; 

// 📨 Async Thunk لإرسال الإيميل عبر EmailJS
export const sendEmail = createAsyncThunk(
  'contact/sendEmail',
  async (formData: ContactFormData, { rejectWithValue }) => {
    if (!serviceID || !templateID || !publicKey) {
      return rejectWithValue('Email service keys are missing.');
    }
    try {
      const response = await emailjs.send(
        serviceID,
        templateID,
        {
          to_email: 'aghyad.fanous.work@gmail.com',
          reply_to: formData.to_email,
          name: formData.name,
          subject: formData.subject,
          message: formData.message,
        },
        publicKey 
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(error.text || 'Failed to send email');
    }
  }
);

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendEmail.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(sendEmail.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(sendEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetStatus } = contactSlice.actions;
export default contactSlice.reducer;
