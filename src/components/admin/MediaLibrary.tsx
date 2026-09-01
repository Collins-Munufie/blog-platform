"use client";

import * as React from "react";
import Image from "next/image";
import { Image as ImageIcon, Copy, Check, Upload, Trash2, Search } from "lucide-react";
import { MediaItem } from "@/lib/types";
import { MOCK_MEDIA_ITEMS } from "@/lib/mock-data";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

export function MediaLibrary() {
  const [items, setItems] = React.useState<MediaItem[]>([]);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [search, setSearch] = React.useState("");
  const { toast } = useToast();

  React.useEffect(() => {
    const saved = localStorage.getItem("devlog_media_items");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {
        setItems(MOCK_MEDIA_ITEMS);
      }
    } else {
      setItems(MOCK_MEDIA_ITEMS);
    }
  }, []);

  const handleCopyMarkdown = (item: MediaItem) => {
    const md = `![${item.name}](${item.url})`;
    navigator.clipboard.writeText(md);
    setCopiedId(item.id);
    toast({
      title: "Markdown Embed Code Copied!",
      description: "Paste directly into your article editor.",
      type: "success",
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUploadSimulate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newItem: MediaItem = {
      id: `media-${Date.now()}`,
      name: file.name,
      url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80",
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      dimensions: "1920x1080",
      category: "Uploads",
      uploadedAt: new Date().toISOString().split("T")[0],
    };

    const next = [newItem, ...items];
    setItems(next);
    localStorage.setItem("devlog_media_items", JSON.stringify(next));
    toast({
      title: "Media Asset Uploaded!",
      description: `${file.name} is ready to use in your articles.`,
      type: "success",
    });
  };

  const filtered = items.filter(
    (i) =>
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search media by name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#20509b] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
          />
        </div>

        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUploadSimulate}
          />
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#20509b] text-white hover:bg-[#12346e] text-xs font-semibold shadow-md transition-all">
            <Upload className="h-4 w-4 text-[#f59e0b]" />
            <span>Upload New Asset</span>
          </div>
        </label>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="card-lift rounded-2xl overflow-hidden group flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
                <Image
                  src={item.url}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-4 space-y-1">
                <p className="text-xs font-bold text-[#08214e] dark:text-white truncate font-mono">
                  {item.name}
                </p>
                <div className="flex items-center justify-between text-[10px] text-[#93a0b4]">
                  <span>{item.dimensions}</span>
                  <span>{item.size}</span>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0">
              <Button
                size="sm"
                onClick={() => handleCopyMarkdown(item)}
                className="w-full text-xs h-8 gap-1.5 rounded-xl bg-[#eef3fa] dark:bg-[#12346e] text-[#20509b] dark:text-[#8ab1e3] hover:bg-[#20509b] hover:text-white transition-colors"
              >
                {copiedId === item.id ? (
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                <span>{copiedId === item.id ? "Embed Copied!" : "Copy Markdown"}</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
