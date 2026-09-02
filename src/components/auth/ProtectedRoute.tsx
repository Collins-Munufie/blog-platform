"use client";

import * as React from "react";
import { getAdminSession } from "@/lib/api/auth";
import { AdminAuthModal } from "./AdminAuthModal";
import { Lock, ShieldAlert } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "author";
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    const checkAuth = () => {
      try {
        const session = getAdminSession();
        setIsAuthenticated(Boolean(session && session.isAuthenticated));
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuth();

    const handleAuthChange = () => {
      checkAuth();
    };

    window.addEventListener("auth_state_changed", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener("auth_state_changed", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen bg-stone-950 overflow-hidden flex items-center justify-center p-4">
        {/* Ambient Security Watermark */}
        <div className="text-center space-y-3 opacity-20 pointer-events-none select-none">
          <ShieldAlert className="h-20 w-20 text-amber-400 mx-auto" />
          <h1 className="text-3xl font-black text-white font-heading">
            Studio Security Gate Active
          </h1>
          <p className="text-xs text-stone-400">
            Authentication Required to Access Dashboard &amp; Command Console
          </p>
        </div>

        <AdminAuthModal
          isOpen={true}
          onSuccess={() => setIsAuthenticated(true)}
        />
      </div>
    );
  }

  return <>{children}</>;
}
