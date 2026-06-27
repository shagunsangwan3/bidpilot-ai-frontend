// FastAPI client. Set VITE_API_URL in your env; defaults to local dev.
// All endpoints below mirror the FastAPI backend contract.

const BASE = (import.meta.env.VITE_API_URL as string | undefined) ?? "http://localhost:8000";

type Json = Record<string, unknown>;

function authHeaders(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const t = window.localStorage.getItem("bidpilot_token");
  return t ? { Authorization: `Bearer ${t}` } : {};
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
      ...(init.headers as Record<string, string> | undefined),
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return (await res.json()) as T;
}

/* -------- Auth -------- */
export type AuthResponse = { token: string; user: { id: string; name: string; email: string } };

export const api = {
  auth: {
    register: (body: { name: string; email: string; password: string }) =>
      request<AuthResponse>("/auth/register", { method: "POST", body: JSON.stringify(body) }),
    login: (body: { email: string; password: string }) =>
      request<AuthResponse>("/auth/login", { method: "POST", body: JSON.stringify(body) }),
    setToken: (token: string) => window.localStorage.setItem("bidpilot_token", token),
    clear: () => window.localStorage.removeItem("bidpilot_token"),
  },
  leads: {
    list: () => request<Json[]>("/leads"),
    create: (body: Json) => request<Json>("/leads", { method: "POST", body: JSON.stringify(body) }),
    update: (id: string, body: Json) =>
      request<Json>(`/leads/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
    remove: (id: string) => request<void>(`/leads/${id}`, { method: "DELETE" }),
  },
  proposal: {
    generate: (body: { job_title: string; job_description: string; budget: string; tone: string }) =>
      request<{ proposal: string }>("/proposal", { method: "POST", body: JSON.stringify(body) }),
    save: (body: { title: string; content: string }) =>
      request<{ id: string }>("/proposal/save", { method: "POST", body: JSON.stringify(body) }),
  },
};
