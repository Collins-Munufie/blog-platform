"use client";

export interface AdminUserSession {
  isAuthenticated: boolean;
  user: {
    name: string;
    email: string;
    role: "admin" | "author";
  };
  token: string;
  authenticatedAt: string;
}

const STORAGE_KEY = "devlog_admin_session";
const MASTER_PASSCODE = "khophi2026";
const SECURITY_PIN = "8899";

export function getAdminSession(): AdminUserSession | null {
  if (typeof window === "undefined") return null;
  try {
    // Check sessionStorage first for active session
    const rawSession = sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY);
    if (!rawSession) return null;
    const session: AdminUserSession = JSON.parse(rawSession);

    // Strict expiry check: sessions expire after 2 hours or browser session
    const authTime = new Date(session.authenticatedAt).getTime();
    const now = new Date().getTime();
    if (now - authTime > 2 * 60 * 60 * 1000) {
      logoutAdmin();
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export function loginAdmin(passcodeOrPin: string, remember: boolean = false): boolean {
  if (typeof window === "undefined") return false;
  const cleaned = passcodeOrPin.trim();

  if (cleaned === MASTER_PASSCODE || cleaned === SECURITY_PIN) {
    const session: AdminUserSession = {
      isAuthenticated: true,
      user: {
        name: "khophi_the_blogger",
        email: "khophi@devlog.africa",
        role: "admin",
      },
      token: `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      authenticatedAt: new Date().toISOString(),
    };

    // Save to sessionStorage by default for strict session security
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    if (remember) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    }
    window.dispatchEvent(new CustomEvent("auth_state_changed", { detail: session }));
    return true;
  }

  return false;
}

export function logoutAdmin(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent("auth_state_changed", { detail: null }));
}
