// Central API client. All requests go to the Cloudflare Worker.
// Set VITE_API_URL in a .env file (see .env.example) to point at your
// deployed worker, e.g. https://api.otakupulse.com or the local
// `wrangler dev` URL during development.

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8787";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  token?: string | null;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, token, headers, ...rest } = options;

  const res = await fetch(`${API_URL}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json() : undefined;

  if (!res.ok) {
    const message = (data && (data as any).error) || res.statusText;
    throw new ApiError(message, res.status);
  }

  return data as T;
}

export const api = {
  get: <T>(path: string, token?: string | null) => request<T>(path, { method: "GET", token }),
  post: <T>(path: string, body?: unknown, token?: string | null) =>
    request<T>(path, { method: "POST", body, token }),
  patch: <T>(path: string, body?: unknown, token?: string | null) =>
    request<T>(path, { method: "PATCH", body, token }),
  delete: <T>(path: string, token?: string | null) => request<T>(path, { method: "DELETE", token }),
};
