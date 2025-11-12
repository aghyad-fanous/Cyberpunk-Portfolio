// 🏷️ ملف: api.ts

import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios"

// ----------------------------------------------------
// 💡 دوال مساعدة للتعامل مع التخزين المحلي (Local Storage)
// ----------------------------------------------------

const TOKEN_KEY = "authToken"

// ✅ حفظ التوكن في التخزين المحلي
export const setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token)

  } else {
    localStorage.removeItem(TOKEN_KEY)
  }
}

// ✅ جلب التوكن من التخزين المحلي
export const getAuthToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY)
}

// ----------------------------------------------------
// 1. تحديد قاعدة URL للـ API
// ----------------------------------------------------

const API_BASE = import.meta.env.VITE_API_URL || "https://portfolio-backend-two-inky.vercel.app"

// ----------------------------------------------------
// 2. إنشاء مثيل (Instance) لـ Axios
// ----------------------------------------------------

const apiInstance = axios.create({
  baseURL: API_BASE,
  // لم نعد نحتاج withCredentials: true ما دمنا لا نعتمد على الكوكيز
  // withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
})

// ----------------------------------------------------
// 3. إعداد Interceptor لإضافة Bearer Token إلى الهيدر
// ----------------------------------------------------

apiInstance.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
  const token = getAuthToken() // 💡 قراءة التوكن من Local Storage

  if (token) {
    // 💡 التحقق من config.headers لتجنب خطأ 'possibly undefined'
    if (!config.headers) {
      config.headers = {} as any
    }
    // إضافة التوكن إلى هيدر Authorization
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}, (error) => {
  return Promise.reject(error)
})

// ----------------------------------------------------
// 4. دالة مساعدة لمعالجة استجابات Axios
// ----------------------------------------------------

const handleAxiosResponse = <T>(response: AxiosResponse<T>): T => {
  return response.data
}

// ----------------------------------------------------
// 5. تعريف هيكل الـ api بنفس أسماء الدوال (get, post, put, del)
// ----------------------------------------------------

export const api = {
  get: async <T>(path: string): Promise<T> => {
    const response = await apiInstance.get<T>(path)
    return handleAxiosResponse(response)
  },

  post: async <T>(path: string, body: any): Promise<T> => {
    const response = await apiInstance.post<T>(path, body)
    return handleAxiosResponse(response)
  },

  put: async <T>(path: string, body: any): Promise<T> => {
    const response = await apiInstance.put<T>(path, body)
    return handleAxiosResponse(response)
  },

  del: async <T>(path: string): Promise<T> => {
    const response = await apiInstance.delete<T>(path)
    return handleAxiosResponse(response)
  },
}