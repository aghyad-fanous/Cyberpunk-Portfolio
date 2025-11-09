// ملف: api.ts

import axios, { AxiosResponse, AxiosRequestConfig } from "axios"

// 1. تحديد قاعدة URL للـ API
const API_BASE = "https://portfolio-backend-two-inky.vercel.app"

// 2. إنشاء مثيل (Instance) لـ Axios
const apiInstance = axios.create({
  baseURL: API_BASE,
  // لطلب الكوكيز مع الطلب (إرسال الكوكيز تلقائياً من المتصفح)
  withCredentials: true,
  // إعداد افتراضي لهيدر Content-Type لطلبات POST/PUT
  headers: {
    "Content-Type": "application/json",
  },
})

// ملاحظة هامة: تم إزالة Interceptor قراءة التوكن.
// يتم الآن إرسال الكوكي "httpOnly" تلقائياً مع الطلبات بواسطة المتصفح.

// 3. دالة مساعدة لمعالجة استجابات Axios
const handleAxiosResponse = <T>(response: AxiosResponse<T>): T => {
  return response.data
}

// 4. تعريف هيكل الـ api بنفس أسماء الدوال (get, post, put, del)

export const api = {
  // دالة GET
  get: async <T>(path: string): Promise<T> => {
    const response = await apiInstance.get<T>(path)
    return handleAxiosResponse(response)
  },

  // دالة POST
  post: async <T>(path: string, body: any): Promise<T> => {
    const response = await apiInstance.post<T>(path, body)
    return handleAxiosResponse(response)
  },

  // دالة PUT
  put: async <T>(path: string, body: any): Promise<T> => {
    const response = await apiInstance.put<T>(path, body)
    return handleAxiosResponse(response)
  },

  // دالة DELETE
  del: async <T>(path: string): Promise<T> => {
    const response = await apiInstance.delete<T>(path)
    return handleAxiosResponse(response)
  },
}
