import { useState } from "react"
import axios from "axios"

interface UploadResult {
  url: string
  deleteUrl?: string
}

export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const uploadImage = async (file: File): Promise<UploadResult | null> => {
    setUploading(true)
    setError(null)
    setImageUrl(null)

    try {
      // ✅ التحقق من الامتداد
      if (!file.type.includes("webp")) {
        setError("image format can only be Webp⚠️")
        setUploading(false)
        return null
      }

      const formData = new FormData()
      formData.append("image", file)

      const key = import.meta.env.VITE_IMGBB_API_KEY
      const url = `https://api.imgbb.com/1/upload?key=${key}`

      const res = await axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      const data = res.data?.data
      const imageLink = data?.url || data?.display_url

      if (imageLink) {
        setImageUrl(imageLink)
      }

      return {
        url: imageLink,
        deleteUrl: data?.delete_url,
      }
    } catch (err: any) {
      const msg =
        err?.response?.data?.error?.message ||
        err?.message ||
        "Upload failed🚫"
      setError(msg)
      return null
    } finally {
      setUploading(false)
    }
  }

  return { uploadImage, uploading, error, imageUrl }
}
