"use client";

import * as React from "react";
import Image from "next/image";
import { Upload, Link as LinkIcon, Image as ImageIcon, X, Check, AlertCircle, Loader2 } from "lucide-react";
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
  const [shortUrl, setShortUrl] = React.useState("");
  const [imageAlt, setImageAlt] = React.useState("Article illustration");
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [imageLoadError, setImageLoadError] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const [libraryItems, setLibraryItems] = React.useState<MediaItem[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      setImageLoadError(false);
      const saved = localStorage.getItem("devlog_media_items");
      if (saved) {
        try {
          setLibraryItems(JSON.parse(saved));
        } catch {}
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageLoadError(false);
    const cleanTitle = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]+/g, " ");
    setImageAlt(cleanTitle);
    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = async (loadEvent) => {
      const dataUrl = loadEvent.target?.result as string;
      if (!dataUrl) {
        setIsUploading(false);
        return;
      }

      setPreviewUrl(dataUrl);

      try {
        // Upload to server API to generate clean short URL
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            dataUrl,
            name: file.name,
            contentType: file.type,
          }),
        });

        if (res.ok) {
          const json = await res.json();
          setShortUrl(json.url);
          setImageUrl(json.url);

          // Save to local Media Library for reuse
          const newItem: MediaItem = {
            id: json.mediaId || `med-${Date.now()}`,
            name: file.name,
            url: json.url,
            size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
            dimensions: "Uploaded Image",
            category: "Article Uploads",
            uploadedAt: new Date().toISOString().split("T")[0],
          };
          const saved = JSON.parse(localStorage.getItem("devlog_media_items") || "[]");
          localStorage.setItem("devlog_media_items", JSON.stringify([newItem, ...saved]));
        } else {
          // Fallback to local asset ID
          const fallbackUrl = `/api/media/med_${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
          setShortUrl(fallbackUrl);
          setImageUrl(fallbackUrl);
        }
      } catch {
        const fallbackUrl = `/api/media/med_${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
        setShortUrl(fallbackUrl);
        setImageUrl(fallbackUrl);
      } finally {
        setIsUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUrlChange = (val: string) => {
    setImageUrl(val);
    setShortUrl(val.trim());
    setPreviewUrl(val.trim() || null);
    setImageLoadError(false);
  };

  const handleConfirmInsert = () => {
    const finalCleanUrl = shortUrl.trim() || imageUrl.trim() || previewUrl;
    if (!finalCleanUrl) return;

    const alt = imageAlt.trim() || "Article illustration";
    // Inserts a clean 1-line markdown image tag without flooding the screen with Base64 code!
    const markdown = `\n\n![${alt}](${finalCleanUrl})\n\n`;
    onInsert(markdown);
    onClose();
    setPreviewUrl(null);
    setImageUrl("");
    setShortUrl("");
    setImageLoadError(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-[#141a24] rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl max-w-lg w-full max-h-[88vh] sm:max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95">
        {/* 1. Header (Fixed Top) */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-stone-100 dark:border-stone-800 shrink-0 bg-white dark:bg-[#141a24]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 shrink-0">
              <ImageIcon className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-stone-900 dark:text-stone-100 font-heading leading-tight">
                Insert Image into Story
              </h3>
              <p className="text-[11px] sm:text-xs text-stone-500">
                Upload from device, paste an image link, or pick from library
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-800 dark:hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* 2. Tabs (Fixed) */}
        <div className="flex border-b border-stone-100 dark:border-stone-800 px-4 sm:px-5 pt-2.5 gap-2 shrink-0 bg-stone-50/50 dark:bg-stone-900/30">
          <button
            type="button"
            onClick={() => setActiveTab("upload")}
            className={`pb-2 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === "upload"
                ? "border-amber-500 text-amber-600 dark:text-amber-400"
                : "border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-300"
            }`}
          >
            <Upload className="h-3.5 w-3.5" />
            <span>Upload File</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("url")}
            className={`pb-2 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
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
              type="button"
              onClick={() => setActiveTab("library")}
              className={`pb-2 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
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

        {/* 3. Middle Content (Scrolls in center) */}
        <div className="p-4 sm:p-5 space-y-4 flex-1 overflow-y-auto min-h-0 scrollbar-thin">
          {/* Tab 1: Upload File */}
          {activeTab === "upload" && (
            <div className="space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="editor-image-upload"
              />
              <div
                onClick={() => !isUploading && fileInputRef.current?.click()}
                className="border-2 border-dashed border-stone-300 dark:border-stone-700 hover:border-amber-500 dark:hover:border-amber-500 rounded-2xl p-5 sm:p-6 text-center cursor-pointer transition-colors bg-stone-50/70 dark:bg-stone-900/40 group"
              >
                {isUploading ? (
                  <div className="py-2 space-y-2">
                    <Loader2 className="h-7 w-7 text-amber-500 animate-spin mx-auto" />
                    <p className="text-xs font-bold text-stone-800 dark:text-stone-200">
                      Processing &amp; optimizing image...
                    </p>
                  </div>
                ) : (
                  <>
                    <Upload className="h-7 w-7 text-amber-600 dark:text-amber-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-xs font-bold text-stone-800 dark:text-stone-200">
                      Click to select a photo from your computer or phone
                    </p>
                    <p className="text-[10px] text-stone-400 mt-0.5">JPG, PNG, WEBP or GIF</p>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Tab 2: Image URL */}
          {activeTab === "url" && (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                Direct Image Web Link
              </label>
              <Input
                placeholder="https://images.unsplash.com/photo-..."
                value={imageUrl}
                onChange={(e) => handleUrlChange(e.target.value)}
              />
              <p className="text-[11px] text-stone-400">
                Tip: Direct image links (ending in .jpg, .png) or use the Upload tab to choose from your device.
              </p>
            </div>
          )}

          {/* Tab 3: Media Library */}
          {activeTab === "library" && (
            <div className="grid grid-cols-3 gap-2.5 max-h-40 overflow-y-auto pr-1">
              {libraryItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setPreviewUrl(item.url);
                    setImageUrl(item.url);
                    setShortUrl(item.url);
                    setImageAlt(item.name);
                    setImageLoadError(false);
                  }}
                  className={`aspect-video rounded-xl overflow-hidden cursor-pointer border-2 transition-all relative ${
                    previewUrl === item.url
                      ? "border-amber-500 ring-2 ring-amber-500/20 shadow-sm"
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
            <div className="space-y-3 pt-3 border-t border-stone-100 dark:border-stone-800">
              <div className="relative h-36 sm:h-40 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                {!imageLoadError ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    onError={() => setImageLoadError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="p-4 text-center space-y-1">
                    <AlertCircle className="h-5 w-5 text-amber-500 mx-auto" />
                    <p className="text-xs font-bold text-stone-700 dark:text-stone-300">
                      Link loaded
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  Image Caption / Alt Description
                </label>
                <Input
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="e.g., AWS Certified Cloud Practitioner Badge"
                />
              </div>
            </div>
          )}
        </div>

        {/* 4. Footer (Fixed Bottom - ALWAYS 100% VISIBLE) */}
        <div className="flex items-center justify-between gap-3 p-3.5 sm:p-4 border-t border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/70 shrink-0">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="rounded-xl text-xs"
          >
            Cancel
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={handleConfirmInsert}
            disabled={!previewUrl && !imageUrl.trim()}
            className="rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-bold gap-1.5 shadow-md hover:opacity-90 px-4"
          >
            <Check className="h-3.5 w-3.5" />
            <span>Insert into Story</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
