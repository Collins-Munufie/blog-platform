"use client";

import * as React from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { Button } from "./Button";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  itemTitle?: string;
  isDeleting?: boolean;
}

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  itemTitle,
  isDeleting = false,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-[#141a24] rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl max-w-md w-full overflow-hidden p-6 space-y-5 animate-in zoom-in-95">
        {/* Header with Warning Icon */}
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 shrink-0">
            <Trash2 className="h-6 w-6" />
          </div>
          <div className="space-y-1 flex-1 min-w-0">
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-heading">
              {title}
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Are you sure you want to permanently delete{" "}
              {itemTitle ? (
                <span className="font-semibold text-stone-800 dark:text-stone-200">
                  &ldquo;{itemTitle}&rdquo;
                </span>
              ) : (
                "this item"
              )}
              ? This action cannot be undone.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-stone-100 dark:border-stone-800">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-xl text-xs"
          >
            Cancel
          </Button>
          <Button
            type="button"
            size="sm"
            isLoading={isDeleting}
            onClick={onConfirm}
            className="rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold gap-1.5 shadow-sm"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Permanently Delete</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
