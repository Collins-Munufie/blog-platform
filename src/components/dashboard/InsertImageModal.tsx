"use client";

import * as React from "react";
import Image from "next/image";
import { Upload, Link as LinkIcon, Image as ImageIcon, X, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { MediaItem } from "@/lib/types";

interface InsertImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (markdownImage: string) => void;
}

export function InsertImageModal({
  isOpen,
  onClose,
  onInsert,
}: InsertImageModalProps) {
  const [activeTab, setActiveTab] = React.useState<"upload" | "url" | "library">("upload");
  const [imageUrl, setImageUrl] = React.useState("");
  const [imageAlt, setImageAlt] = React.useState("Article illustration");
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [libraryItems, setLibraryItems] = React.useState<MediaItem[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem("devlog_media_items");
      if (saved) {
        try {
          setLibraryItems(JSON.parse(saved));
        } catch {}
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageAlt(file.name.replace(/\.[^/.]+$/, ""));
    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const dataUrl = loadEvent.target?.result as string;
      if (dataUrl) {
        setPreviewUrl(dataUrl);
        setImageUrl(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleConfirmInsert = () => {
    const finalUrl = previewUrl || imageUrl.trim();
    if (!finalUrl) return;

    const alt = imageAlt.trim() || "Article image";
    const markdown = `\n\n![${alt}](${finalUrl})\n\n`;
    onInsert(markdown);
    onClose();
    setPreviewUrl(null);
    setImageUrl("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-[#141a24] rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
              <ImageIcon className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 font-heading">
                Insert Image into Story
              </h3>
              <p className="text-xs text-stone-500">
                Upload from your device or paste an image link
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-800 dark:hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-stone-100 dark:border-stone-800 px-5 pt-3 gap-2">
          <button
            onClick={() => setActiveTab("upload")}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === "upload"
                ? "border-amber-500 text-amber-600 dark:text-amber-400"
                : "border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-300"
            }`}
          >
            <Upload className="h-3.5 w-3.5" />
            <span>Upload File</span>
          </button>

          <button
            onClick={() => setActiveTab("url")}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === "url"
                ? "border-amber-500 text-amber-600 dark:text-amber-400"
                : "border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-300"
            }`}
          >
            <LinkIcon className="h-3.5 w-3.5" />
            <span>Image URL</span>
          </button>

          {libraryItems.length > 0 && (
            <button
              onClick={() => setActiveTab("library")}
              className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === "library"
                  ? "border-amber-500 text-amber-600 dark:text-amber-400"
                  : "border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-300"
              }`}
            >
              <ImageIcon className="h-3.5 w-3.5" />
              <span>Library ({libraryItems.length})</span>
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {activeTab === "upload" && (
            <div className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="editor-image-upload"
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-stone-200 dark:border-stone-700 hover:border-amber-500 dark:hover:border-amber-500 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-stone-50/50 dark:bg-stone-900/30"
              >
                <Upload className="h-8 w-8 text-amber-600 dark:text-amber-400 mx-auto mb-2" />
                <p className="text-xs font-bold text-stone-800 dark:text-stone-200">
                  Click to choose a photo from your computer or phone
                </p>
                <p className="text-[11px] text-stone-400 mt-1">PNG, JPG, WEBP or GIF</p>
              </div>
            </div>
          )}

          {activeTab === "url" && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Image Web Link
                </label>
                <Input
                  placeholder="https://images.unsplash.com/..."
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                    setPreviewUrl(e.target.value);
                  }}
                />
              </div>
            </div>
          )}

          {activeTab === "library" && (
            <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
              {libraryItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setPreviewUrl(item.url);
                    setImageUrl(item.url);
                    setImageAlt(item.name);
                  }}
                  className={`aspect-video rounded-xl overflow-hidden cursor-pointer border-2 transition-all relative ${
                    previewUrl === item.url
                      ? "border-amber-500 ring-2 ring-amber-500/20"
                      : "border-stone-200 dark:border-stone-700 opacity-80 hover:opacity-100"
                  }`}
                >
                  <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}

          {/* Preview & Caption */}
          {previewUrl && (
            <div className="space-y-3 pt-2 border-t border-stone-100 dark:border-stone-800">
              <div className="relative aspect-video rounded-xl overflow-hidden border border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800">
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Image Caption / Alt Description
                </label>
                <Input
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="e.g., Street view in Osu, Accra"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2.5 p-4 border-t border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/40">
          <Button variant="ghost" size="sm" onClick={onClose} className="rounded-xl text-xs">
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleConfirmInsert}
            disabled={!previewUrl && !imageUrl.trim()}
            className="rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-bold gap-1.5"
          >
            <Check className="h-3.5 w-3.5" />
            <span>Insert into Story</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
