"use client";

import * as React from "react";
import { Award, Plus, Sparkles, Printer, CheckCircle2 } from "lucide-react";
import { AuthorBadge } from "@/lib/types";
import { getBadges, generateBadge } from "@/lib/api/admin";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { BadgeCard } from "@/components/admin/BadgeCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";

export default function BadgesPage() {
  const [badges, setBadges] = React.useState<AuthorBadge[]>([]);
  const [isCreating, setIsCreating] = React.useState(false);
  const [name, setName] = React.useState("");
  const [role, setRole] = React.useState("Staff Infrastructure Engineer");
  const [specialization, setSpecialization] = React.useState("Distributed Systems & Edge Storage");
  const [avatar, setAvatar] = React.useState(
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  );
  const { toast } = useToast();

  React.useEffect(() => {
    getBadges().then(setBadges);
  }, []);

  const handleCreateBadge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const created = await generateBadge({
        authorName: name.trim(),
        role,
        specialization,
        avatar,
      });
      setBadges((prev) => [created, ...prev]);
      setName("");
      setIsCreating(false);
      toast({
        title: "Author ID Generated!",
        description: `Official badge ${created.badgeCode} issued for ${created.authorName}.`,
        type: "success",
      });
    } catch {
      toast({ title: "Failed to generate badge", type: "error" });
    }
  };

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Author ID Badges"
        description="Issue and manage verified contributor ID passes."
        action={
          <Button
            size="sm"
            onClick={() => setIsCreating(!isCreating)}
            className="gap-2 bg-[#20509b] text-white rounded-xl text-xs h-9 font-semibold"
          >
            <Plus className="h-4 w-4" /> Issue New Badge
          </Button>
        }
      />

      {/* Badge Generation Drawer / Form */}
      {isCreating && (
        <form
          onSubmit={handleCreateBadge}
          className="card-lift p-6 rounded-3xl space-y-4 border-2 border-blue-400/40 bg-white dark:bg-[#08214e] max-w-2xl animate-in fade-in"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#f4ae17]" />
            <h3 className="text-sm font-bold text-[#08214e] dark:text-white font-heading">
              Generate Official Contributor ID Badge
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Author Full Name
              </label>
              <Input
                required
                placeholder="e.g. Dr. Jonathan Hayes"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Editorial Role
              </label>
              <Input
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Principal Systems Architect"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Specialization Domain
              </label>
              <Input
                required
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                placeholder="e.g. Distributed Consensus & Cloud Native"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Avatar Photo URL
              </label>
              <Input
                required
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsCreating(false)}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" className="bg-[#20509b] text-white">
              Generate &amp; Register Pass
            </Button>
          </div>
        </form>
      )}

      {/* Grid of Issued Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {badges.map((badge) => (
          <BadgeCard key={badge.id} badge={badge} />
        ))}
      </div>
    </div>
  );
}
