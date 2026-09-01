import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#f7f9fc] dark:bg-[#041536] text-[#08214e] dark:text-slate-100">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto min-h-screen p-6 sm:p-10 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}
