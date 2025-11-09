import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "../../api/client"
import { ResponseType } from "axios"

type User = {
  id: string
  email: string
  role: "USER" | "ADMIN"
}

type AuthState = {
  user: User | null
  status: "idle" | "loading" | "failed"
  error?: string | null
  hydrated: boolean // ✅ علم إذا تم جلب الـ user من الكوكيز
}

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
  hydrated: false,
}


// ✅ تسجيل الدخول
export const loginUser = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    // الـ token بيرجع بالكوكيز، لذلك ما منخزنو يدويًا
    const data  = await api.post("/api/auth/login", credentials) as { user: User }
    return data.user as User
  } catch (err: any) {
    return rejectWithValue(err.message || "Login failed")
  }
})


export const fetchCurrentUser = createAsyncThunk<User | null, void, { rejectValue: string }>(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.get("/api/auth/me") as { user: User }
      return data.user
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch user")
    }
  }
)

// ✅ تسجيل الخروج
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await api.post("/api/auth/logout", {})
})

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
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
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload || "Login failed"
      })
      // fetchCurrentUser
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.user = null
      })
      // logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.status = "idle"
      })
  },
})

export default authSlice.reducer
