import { ImageIcon } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { MediaLibrary } from "@/components/admin/MediaLibrary";

export default function AdminMediaPage() {
  return (
    <div className="space-y-6">
      <AdminHeader
        title="Media &amp; Asset Library"
        description="Manage cover photographs, editorial illustrations, and copy Markdown embed codes directly into articles."
      />
      <MediaLibrary />
    </div>
  );
}
