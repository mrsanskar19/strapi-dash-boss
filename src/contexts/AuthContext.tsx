// AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { DATABASE_URL } from '../lib/env';
import { useNavigate } from 'react-router-dom';

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
}

export interface AuthSession {
  authToken: string;
  user: AuthUser;
  expiresAt: number;
}

export interface AuthContextType {
  user: AuthUser | null;
  session: AuthSession | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthSession>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
  updateProfile: (patch: Partial<AuthUser>) => void;
}

const STORAGE_SESSION_KEY = 'app_auth_session_v1';
const STORAGE_USERS_KEY = 'app_auth_users_v1';

function now() {
  return Date.now();
}

function saveSession(session: AuthSession | null) {
  if (!session) {
    localStorage.removeItem(STORAGE_SESSION_KEY);
  } else {
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));
  }
}

function loadSession(): AuthSession | null {
  const raw = localStorage.getItem(STORAGE_SESSION_KEY);
  if (!raw) return null;
  try {
    const s: AuthSession = JSON.parse(raw);
    if (!s?.authToken) return null;
    if (s.expiresAt && s.expiresAt < now()) {
      saveSession(null);
      return null;
    }
    return s;
  } catch {
    return null;
  }
}

function loadUsers(): Array<{ id: string; email: string; password?: string; name?: string }> {
  const raw = localStorage.getItem(STORAGE_USERS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveUsers(users: Array<{ id: string; email: string; name?: string }>) {
  localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
}

/* ---------- Context Implementation ---------- */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(() => loadSession());
  const [user, setUser] = useState<AuthUser | null>(() => loadSession()?.user ?? null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Merge backend response with existing session safely.
  function mergeSessionWithBackend(existing: AuthSession | null, backend: any): AuthSession | null {
    if (!existing) return null;
    const token = backend?.token ?? existing.authToken;
    const user: AuthUser = {
      id: backend?._id ?? existing.user.id,
      email: backend?.email ?? existing.user.email,
      name: backend?.name ?? existing.user.name,
    };
    return {
      authToken: token,
      user,
      expiresAt: existing.expiresAt ?? (now() + 1000 * 60 * 60 * 24 * 7),
    };
  }

  // Validate stored session on mount. Do not auto-logout on network errors.
  async function checkAuth() {
    const current = session ?? loadSession();
    if (!current?.authToken) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${DATABASE_URL}/api/v1/auth/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${current.authToken}`,
        },
      });

      if (!res.ok) {
        // If token invalid, logout. For other errors, keep current session (network issues).
        if (res.status === 401) {
          logout();
        } else {
          console.warn('Auth check non-OK status', res.status, res.statusText);
        }
        setLoading(false);
        return;
      }

      const found = await res.json();
      // Update session safely: keep token unless backend sends a new one.
      const merged = mergeSessionWithBackend(current, found);
      if (merged) {
        setSession(merged);
        setUser(merged.user);
        saveSession(merged);
      }
    } catch (err) {
      console.error('Auth check failed (network/CORS):', err);
      // Do not logout on network errors; user might still be valid.
    } finally {
      setLoading(false);
    }
  }

  // Run checkAuth once on mount
  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist session whenever it actually changes
  useEffect(() => {
    saveSession(session);
    setUser(session?.user ?? null);
    // don't call checkAuth here to avoid loops
  }, [session]);

  async function login(email: string, password: string) {
    setLoading(true);
    try {
      const res = await fetch(`${DATABASE_URL}/api/v1/auth/login`, {
        body: JSON.stringify({ email, password }),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => res.statusText);
        throw new Error(`Login failed: ${res.status} ${errText}`);
      }

      const found = await res.json();

      if (!found || !found.token || !found._id) {
        throw new Error('Invalid login response from server.');
      }

      if (!found.isEmailVerified) {
        navigate(`/verify-email?token=${found.token}`);
      }

      const newSession: AuthSession = {
        authToken: found.token,
        user: { id: found._id, email: found.email, name: found.name },
        expiresAt: now() + 1000 * 60 * 60 * 24 * 7,
      };

      setSession(newSession);
      setUser(newSession.user);
      saveSession(newSession);
      saveUsers([newSession.user]);
      return newSession;
    } catch (err) {
      console.error('Login error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function register(email: string, password: string, name?: string): Promise<void> {
    setLoading(true);
    try {
      const res = await fetch(`${DATABASE_URL}/api/v1/auth/register`, {
        body: JSON.stringify({ name, email, password }),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => res.statusText);
        throw new Error(`Register failed: ${res.status} ${errText}`);
      }

      const found = await res.json();

      if (!found) {
        throw new Error('Invalid register response from server.');
      }

      if (found.verificationToken) {
        navigate(`/verify-email?token=${found.verificationToken}`);
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setSession(null);
    setUser(null);
    saveUsers([]);
    saveSession(null);
    localStorage.removeItem(STORAGE_SESSION_KEY);
    localStorage.removeItem(STORAGE_USERS_KEY);
    navigate('/login');
  }

  function updateProfile(patch: Partial<AuthUser>) {
    if (!session) return;
    const updatedUser = { ...session.user, ...patch };
    const updatedSession = { ...session, user: updatedUser };
    setSession(updatedSession);
    saveSession(updatedSession);

    const users = loadUsers();
    const idx = users.findIndex((u) => u.id === updatedUser.id);
    if (idx >= 0) {
      users[idx] = { ...users[idx], name: updatedUser.name ?? users[idx].name };
      saveUsers(users);
    }
  }

  const value: AuthContextType = {
    user,
    session,
    loading,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/* ---------- Helper components (examples) ---------- */
export function RequireAuth({ children, fallback = null }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <>{fallback}</>;
  return <>{children}</>;
}
