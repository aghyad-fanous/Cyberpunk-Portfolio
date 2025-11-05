const API_BASE = import.meta.env.VITE_API_URL || 'https://portfolio-backend-two-inky.vercel.app';

const jsonHeaders = { 'Content-Type': 'application/json' };

const handleResponse = async (res: Response) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data?.message || `Request failed with status ${res.status}`;
    throw new Error(msg);
  }
  return data;
};

export const api = {
  get: async (path: string) => {
    const res = await fetch(`${API_BASE}${path}`, { credentials: 'include' });
    return handleResponse(res);
  },

  post: async (path: string, body: any) => {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      credentials: 'include',
      headers: jsonHeaders,
      body: JSON.stringify(body),
    });
    return handleResponse(res);
  },

  put: async (path: string, body: any) => {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'PUT',
      credentials: 'include',
      headers: jsonHeaders,
      body: JSON.stringify(body),
    });
    return handleResponse(res);
  },

  del: async (path: string) => {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    return handleResponse(res);
  },
};
