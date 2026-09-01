"use client";

import * as React from "react";
import Image from "next/image";
import { Image as ImageIcon, Copy, Check, Upload, Trash2, Search, Plus, ExternalLink } from "lucide-react";
import { MediaItem } from "@/lib/types";
import { MOCK_MEDIA_ITEMS } from "@/lib/mock-data";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

const REAL_SEED_MEDIA: MediaItem[] = [
  {
    id: "media-khophi",
    name: "khophi-portrait.jpg",
    url: "/khophi_profile.jpg",
    size: "1.8 MB",
    dimensions: "1200x1600",
    category: "Author & Studio",
    uploadedAt: "2026-09-01",
  },
  {
    id: "media-accra-skyline",
    name: "accra-osu-evening.jpg",
    url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80",
    size: "1.4 MB",
    dimensions: "1920x1080",
    category: "Accra City",
    uploadedAt: "2026-08-30",
  },
  {
    id: "media-culture",
    name: "afrobeats-concert.jpg",
    url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&auto=format&fit=crop&q=80",
    size: "2.1 MB",
    dimensions: "2048x1365",
    category: "Culture",
    uploadedAt: "2026-08-28",
  },
  {
    id: "media-sports",
    name: "ghana-stadium.jpg",
    url: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop&q=80",
    size: "980 KB",
    dimensions: "1600x1066",
    category: "Sports",
    uploadedAt: "2026-08-25",
  },
  {
    id: "media-fintech",
    name: "momo-merchant-pos.jpg",
    url: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80",
    size: "1.2 MB",
    dimensions: "1800x1200",
    category: "Fintech",
    uploadedAt: "2026-08-20",
  },
];

export function MediaLibrary() {
  const [items, setItems] = React.useState<MediaItem[]>([]);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [search, setSearch] = React.useState("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  React.useEffect(() => {
    const saved = localStorage.getItem("devlog_media_items");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as MediaItem[];
        // Filter out any old hardcoded matrix code images
        const cleaned = parsed.map((item) =>
          item.url.includes("photo-1526374965328-7f61d4dc18c5")
            ? { ...item, url: "/khophi_profile.jpg" }
            : item
        );
        setItems(cleaned);
      } catch {
        setItems(REAL_SEED_MEDIA);
      }
    } else {
      setItems(REAL_SEED_MEDIA);
    }
  }, []);

  const handleCopyMarkdown = (item: MediaItem) => {
    const md = `![${item.name}](${item.url})`;
    navigator.clipboard.writeText(md);
    setCopiedId(item.id);
    toast({
      title: "Markdown Embed Code Copied!",
      description: `Copied: ${md}`,
      type: "success",
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteItem = (id: string, name: string) => {
    const next = items.filter((i) => i.id !== id);
    setItems(next);
    localStorage.setItem("devlog_media_items", JSON.stringify(next));
    toast({
      title: "Asset Removed",
      description: `"${name}" removed from library.`,
      type: "info",
    });
  };

  // Real Image Upload using FileReader to store the actual visual appearance
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const dataUrl = loadEvent.target?.result as string;
      if (!dataUrl) return;

      const newItem: MediaItem = {
        id: `media-${Date.now()}`,
        name: file.name,
        url: dataUrl,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        dimensions: "Custom Upload",
        category: "My Uploads",
        uploadedAt: new Date().toISOString().split("T")[0],
      };

      const next = [newItem, ...items];
      setItems(next);
      localStorage.setItem("devlog_media_items", JSON.stringify(next));

      toast({
        title: "Real Asset Uploaded!",
        description: `"${file.name}" has been loaded and ready to embed in your articles.`,
        type: "success",
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

    reader.readAsDataURL(file);
  };

  const filtered = items.filter(
    (i) =>
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search assets by name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 bg-white text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#f59e0b] dark:border-stone-800 dark:bg-stone-900 dark:text-stone-100"
          />
        </div>

        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="media-file-input"
          />
          <label htmlFor="media-file-input">
            <Button
              type="button"
              size="sm"
              className="gap-2 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 rounded-xl text-xs font-bold hover:opacity-90 shadow-sm cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-3.5 w-3.5" />
              <span>Upload New Photo</span>
            </Button>
          </label>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-full py-12 text-center p-8 rounded-3xl bg-white dark:bg-[#141a24] border border-stone-200 dark:border-stone-800 space-y-2">
            <ImageIcon className="h-8 w-8 text-stone-300 mx-auto" />
            <p className="font-bold text-sm text-stone-800 dark:text-stone-200">No media assets found</p>
            <p className="text-xs text-stone-500">Upload a new image above to get started.</p>
          </div>
        ) : (
          filtered.map((item) => {
            const isCopied = copiedId === item.id;
            return (
              <div
                key={item.id}
                className="group card-simple rounded-2xl overflow-hidden flex flex-col justify-between"
              >
                {/* Image Preview Box */}
                <div className="relative aspect-[16/10] bg-stone-100 dark:bg-stone-800 overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-2 left-2 text-[10px] font-bold bg-stone-900/80 text-white px-2 py-0.5 rounded-md backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>

                {/* Metadata & Actions */}
                <div className="p-3.5 space-y-2.5">
                  <div>
                    <p className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate" title={item.name}>
                      {item.name}
                    </p>
                    <p className="text-[10px] text-stone-500 font-mono mt-0.5">
                      {item.size} • {item.dimensions}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 pt-1 border-t border-stone-100 dark:border-stone-800">
                    <Button
                      size="sm"
                      variant={isCopied ? "secondary" : "outline"}
                      onClick={() => handleCopyMarkdown(item)}
                      className={`flex-1 text-[11px] h-7 gap-1 rounded-lg font-semibold ${
                        isCopied ? "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300" : ""
                      }`}
                      title="Copy ![alt](url) Markdown snippet"
                    >
                      {isCopied ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-600" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3 text-stone-500" />
                          <span>Copy Markdown</span>
                        </>
                      )}
                    </Button>

                    <button
                      onClick={() => handleDeleteItem(item.id, item.name)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title="Delete asset"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
