// src/api/client.ts
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const jsonHeaders = { 'Content-Type': 'application/json' };

export const api = {
  get: async (path: string) => {
    const res = await fetch(`${API_BASE}${path}`, { credentials: 'include' });
    if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
    return res.json();
  },

  post: async (path: string, body: any) => {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      credentials: 'include',
      headers: jsonHeaders,
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`);
    return res.json();
  },

  put: async (path: string, body: any) => {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'PUT',
      credentials: 'include',
      headers: jsonHeaders,
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`PUT ${path} failed: ${res.status}`);
    return res.json();
  },

  del: async (path: string) => {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!res.ok) throw new Error(`DELETE ${path} failed: ${res.status}`);
    return res.json();
  },
};
