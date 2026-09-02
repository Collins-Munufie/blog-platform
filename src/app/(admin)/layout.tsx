import { AdminShell } from "@/components/admin/AdminShell";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminShell>{children}</AdminShell>
    </ProtectedRoute>
  );
}
