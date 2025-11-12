// 🏷️ ملف: authSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
// 💡 استيراد دوال مساعدة التوكن الجديدة
import { api, setAuthToken, getAuthToken } from "../../api/client" 
import { get } from "http"
// لم تعد هناك حاجة لـ ResponseType
// import { ResponseType } from "axios" 

// ----------------------------------------------------
// 💡 تعريف أنواع البيانات
// ----------------------------------------------------

type User = {
  id: string
  email: string
  role: "USER" | "ADMIN"
}

// 💡 تعريف نوع الاستجابة من الخادم (يحتوي على المستخدم والتوكن)
type AuthResponse = {
  user: User
  message: string
  token: string
}

type AuthState = {
  user: User | null
  token: string | null // 💡 تم إضافة حقل التوكن
  status: "idle" | "loading" | "failed"
  error?: string | null
  hydrated: boolean // ✅ علم إذا تم جلب الـ user من التخزين
}

const initialState: AuthState = {
  user: null,
  token: getAuthToken(), // 💡 قراءة التوكن المخزن عند بدء التطبيق
  status: "idle",
  error: null,
  hydrated: false,
}

// ----------------------------------------------------
// 💡 Thunks (المهام غير المتزامنة)
// ----------------------------------------------------

// ✅ تسجيل الدخول
export const loginUser = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    // 💡 تم تغيير النوع لاستقبال التوكن
    const data = await api.post("/api/auth/login", credentials) as AuthResponse 
    
    // 💡 حفظ التوكن في Local Storage
    setAuthToken(data.token)
    
    return data.user as User
  } catch (err: any) {
    return rejectWithValue(err.message || "Login failed")
  }
})

// ✅ جلب المستخدم الحالي
export const fetchCurrentUser = createAsyncThunk<User | null, void, { rejectValue: string }>(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    // 💡 التحقق أولاً إذا كان التوكن موجوداً في التخزين، إذا لم يكن، نتوقف
    if (!getAuthToken()) {
      return null
    }

    try {
      const data = await api.get("/api/auth/me") as { user: User }
      return data.user
    } catch (err: any) {
      // 💡 إذا فشل الجلب (401 مثلاً)، نفترض أن التوكن غير صالح ونحذفه
      setAuthToken(null) 
      return rejectWithValue(err.message || "Failed to fetch user")
    }
  }
)

// ✅ تسجيل الخروج
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  // 💡 حذف التوكن من Local Storage
  setAuthToken(null) 
  // إرسال طلب الخروج إلى الخادم (إذا كان ينفذ أي تنظيف على الخادم)
  await api.post("/api/auth/logout", {})
})

// ----------------------------------------------------
// 💡 الشريحة (Slice)
// ----------------------------------------------------

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // 💡 دالة لتحديد أن الحالة قد تم ترطيبها (Hydrated)
    setHydrated: (state, action) => {
      state.hydrated = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(loginUser.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "idle"
        state.user = action.payload
        // 💡 حفظ التوكن في Redux Store
        // نعلم أن التوكن تم حفظه في Local Storage داخل الـ Thunk
        state.token = getAuthToken() 
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload || "Login failed"
        state.token = null // حذف التوكن عند الفشل
      })
      // fetchCurrentUser
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.hydrated = true
        // إذا كان المستخدم null، فهذا يعني أن التوكن غير موجود أو غير صالح، وقمنا بحذفه في الـ Thunk
        if (action.payload === null) {
          state.token = null
        } else {
          // إذا نجح الجلب، تأكد من وجود التوكن في الـ store
          state.token = getAuthToken() 
        }
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.user = null
        state.token = null // حذف التوكن عند فشل التحقق
        state.hydrated = true
      })
      // logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.status = "idle"
        state.token = null // حذف التوكن من Redux Store
      })
  },
})

export const { setHydrated } = authSlice.actions
export default authSlice.reducer