export type Role = 'client' | 'coach';

const TOKEN_KEY = 'tl_auth';

export function login(role: Role, name = '') {
  const payload = { role, name, ts: Date.now() };
  localStorage.setItem(TOKEN_KEY, JSON.stringify(payload));
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getSession() {
  const raw = localStorage.getItem(TOKEN_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as { role: Role; name?: string; ts: number };
  } catch {
    return null;
  }
}
