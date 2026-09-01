"use client";

import * as React from "react";
import Image from "next/image";
import { User, Camera, Save, CheckCircle2, MessageCircle, Twitter, Globe, MapPin, Sparkles } from "lucide-react";
import { getAdminProfile, updateAdminProfile } from "@/lib/api/admin";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";

export default function AdminProfilePage() {
  const [profile, setProfile] = React.useState({
    name: "Khophi",
    handle: "khophi_the_blogger",
    avatar: "/khophi_profile.jpg",
    role: "Engineer, Writer & Creator",
    bio: "Hey! I’m Khophi. I write essays on building software, mobile money infrastructure, Afrobeats culture, and daily life in Accra, Ghana.",
    location: "Accra, Ghana 🇬🇭",
    twitter: "https://twitter.com/khophi_blogger",
    whatsapp: "https://wa.me/233240000000",
    website: "https://khophitheblogger.com",
  });
  const [saving, setSaving] = React.useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    getAdminProfile().then((p) => {
      if (p) setProfile((prev) => ({ ...prev, ...p }));
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateAdminProfile(profile);
      toast({
        title: "Profile Updated!",
        description: "Your author bio and profile details have been saved.",
        type: "success",
      });
    } catch {
      toast({ title: "Failed to update profile", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <AdminHeader
        title="Admin Profile &amp; Bio"
        description="Edit your public author profile, biography, photo, and direct social links."
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Card & Avatar Preview */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#141a24] border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col sm:flex-row items-center gap-6">
          <div className="relative group shrink-0">
            <Image
              src={profile.avatar || "/khophi_profile.jpg"}
              alt={profile.name}
              width={96}
              height={96}
              priority
              className="rounded-3xl object-cover ring-4 ring-amber-500 shadow-md h-24 w-24"
            />
            <div className="absolute -bottom-2 -right-2 bg-amber-500 text-stone-950 p-1.5 rounded-full shadow-md">
              <Camera className="h-4 w-4" />
            </div>
          </div>

          <div className="space-y-1 text-center sm:text-left flex-1">
            <h2 className="text-xl font-black text-stone-900 dark:text-stone-100 font-heading">
              {profile.name}
            </h2>
            <p className="text-xs text-amber-600 dark:text-amber-400 font-mono font-bold">
              @{profile.handle}
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {profile.role} • {profile.location}
            </p>
          </div>
        </div>

        {/* Input Fields */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#141a24] border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                Full Name
              </label>
              <Input
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                Username / Handle
              </label>
              <Input
                value={profile.handle}
                onChange={(e) => setProfile({ ...profile, handle: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                Role / Title
              </label>
              <Input
                value={profile.role}
                onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                Location
              </label>
              <Input
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
              Avatar Photo URL or Local Path
            </label>
            <Input
              value={profile.avatar}
              onChange={(e) => setProfile({ ...profile, avatar: e.target.value })}
            />
            <p className="text-[11px] text-stone-400 mt-1">Default is your authentic portrait: /khophi_profile.jpg</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
              Author Biography
            </label>
            <Textarea
              rows={4}
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            />
            <p className="text-[11px] text-stone-400 mt-1">Displayed at the bottom of all your published articles and on the about page.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                WhatsApp Link / Number
              </label>
              <Input
                value={profile.whatsapp}
                onChange={(e) => setProfile({ ...profile, whatsapp: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                Twitter / X URL
              </label>
              <Input
                value={profile.twitter}
                onChange={(e) => setProfile({ ...profile, twitter: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                Website URL
              </label>
              <Input
                value={profile.website}
                onChange={(e) => setProfile({ ...profile, website: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3">
          <Button
            type="submit"
            isLoading={saving}
            className="gap-2 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 rounded-xl px-6 font-bold text-xs sm:text-sm hover:opacity-90"
          >
            <Save className="h-4 w-4" />
            <span>Save Profile</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
