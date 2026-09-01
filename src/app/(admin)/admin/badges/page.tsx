"use client";

import * as React from "react";
import { Award, Plus, Sparkles, Printer, CheckCircle2, Shield } from "lucide-react";
import { AuthorBadge } from "@/lib/types";
import { getBadges, generateBadge } from "@/lib/api/admin";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { BadgeCard } from "@/components/admin/BadgeCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";

const SEED_PRESS_PASSES: AuthorBadge[] = [
  {
    id: "badge-khophi",
    badgeCode: "GH-PRESS-2026-001",
    authorId: "auth-khophi",
    authorName: "Khophi",
    authorHandle: "khophi_the_blogger",
    avatar: "/khophi_profile.jpg",
    role: "Lead Journalist & Publication Founder",
    specialization: "African Tech, Fintech Ecosystem & Culture",
    issueDate: "2026-01-01",
    expiryDate: "2027-12-31",
    verificationUrl: "https://khophitheblogger.com/about",
  },
  {
    id: "badge-contributor",
    badgeCode: "GH-PRESS-2026-002",
    authorId: "auth-2",
    authorName: "Kofi Mensah",
    authorHandle: "kmensah_tech",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    role: "Senior Tech Contributor",
    specialization: "Telecommunications & Mobile Money",
    issueDate: "2026-03-15",
    expiryDate: "2027-03-15",
    verificationUrl: "https://khophitheblogger.com/about",
  },
];

export default function BadgesPage() {
  const [badges, setBadges] = React.useState<AuthorBadge[]>([]);
  const [isCreating, setIsCreating] = React.useState(false);
  const [name, setName] = React.useState("");
  const [role, setRole] = React.useState("Contributing Writer");
  const [specialization, setSpecialization] = React.useState("Tech & Culture");
  const [avatar, setAvatar] = React.useState("/khophi_profile.jpg");
  const { toast } = useToast();

  React.useEffect(() => {
    const saved = localStorage.getItem("devlog_press_badges");
    if (saved) {
      try {
        setBadges(JSON.parse(saved));
      } catch {
        setBadges(SEED_PRESS_PASSES);
      }
    } else {
      setBadges(SEED_PRESS_PASSES);
      localStorage.setItem("devlog_press_badges", JSON.stringify(SEED_PRESS_PASSES));
    }
  }, []);

  const handleCreateBadge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newBadge: AuthorBadge = {
      id: `badge-${Date.now()}`,
      badgeCode: `GH-PRESS-2026-${Math.floor(100 + Math.random() * 900)}`,
      authorId: `auth-${Date.now()}`,
      authorName: name.trim(),
      authorHandle: name.toLowerCase().replace(/\s+/g, "_"),
      avatar: avatar.trim() || "/khophi_profile.jpg",
      role,
      specialization,
      issueDate: new Date().toISOString().split("T")[0],
      expiryDate: "2027-12-31",
      verificationUrl: "https://khophitheblogger.com/about",
    };

    const updated = [newBadge, ...badges];
    setBadges(updated);
    localStorage.setItem("devlog_press_badges", JSON.stringify(updated));

    setName("");
    setIsCreating(false);
    toast({
      title: "Press ID Pass Issued!",
      description: `Official accreditation pass ${newBadge.badgeCode} created for ${newBadge.authorName}.`,
      type: "success",
    });
  };

  const handleDeleteBadge = (id: string) => {
    const filtered = badges.filter((b) => b.id !== id);
    setBadges(filtered);
    localStorage.setItem("devlog_press_badges", JSON.stringify(filtered));
    toast({ title: "Press Pass Revoked", type: "info" });
  };

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Official Press Accreditation Passes"
        description="Issue, verify, and print official Author &amp; Contributor ID badges for event coverage and field reporting."
        action={
          <Button
            size="sm"
            onClick={() => setIsCreating(!isCreating)}
            className="gap-2 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 rounded-xl text-xs h-9 font-bold hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> Issue New Press Pass
          </Button>
        }
      />

      {/* Creation Modal / Form */}
      {isCreating && (
        <form
          onSubmit={handleCreateBadge}
          className="p-6 rounded-3xl space-y-4 border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#141a24] max-w-2xl animate-in fade-in shadow-sm"
        >
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-amber-500" />
            <h3 className="text-sm font-bold text-stone-900 dark:text-white font-heading">
              Issue Official Contributor Press Pass
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                Author / Journalist Name
              </label>
              <Input
                required
                placeholder="e.g. Kwame Asante"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                Editorial Role / Beat
              </label>
              <Input
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                Specialization / Beat Focus
              </label>
              <Input
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                Photo URL or Local Path
              </label>
              <Input
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                placeholder="/khophi_profile.jpg"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsCreating(false)}
              className="rounded-xl text-xs"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              className="rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-bold"
            >
              Issue Pass
            </Button>
          </div>
        </form>
      )}

      {/* Grid of ID Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {badges.map((badge) => (
          <BadgeCard
            key={badge.id}
            badge={badge}
            onDelete={handleDeleteBadge}
          />
        ))}
      </div>
    </div>
  );
}
