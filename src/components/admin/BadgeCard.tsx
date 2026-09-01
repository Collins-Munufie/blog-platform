"use client";

import * as React from "react";
import Image from "next/image";
import { Printer, CheckCircle, ShieldCheck, QrCode, Trash2, ExternalLink } from "lucide-react";
import { AuthorBadge } from "@/lib/types";
import { Button } from "@/components/ui/Button";

export function BadgeCard({
  badge,
  onDelete,
}: {
  badge: AuthorBadge;
  onDelete?: (id: string) => void;
}) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="card-simple p-5 rounded-3xl space-y-4 flex flex-col justify-between max-w-sm mx-auto w-full bg-white dark:bg-[#141a24] border border-stone-200 dark:border-stone-800 shadow-sm">
      {/* Physical Press ID Pass (Printable Area) */}
      <div
        id={`badge-print-${badge.id}`}
        className="rounded-2xl bg-gradient-to-b from-[#08214e] to-[#041536] text-white p-5 relative overflow-hidden border border-amber-400/40 shadow-xl space-y-4"
      >
        {/* Lanyard Slot Cutout Simulation */}
        <div className="w-12 h-2 bg-stone-900/60 rounded-full mx-auto border border-white/20" />

        {/* Header: Official Press Pass */}
        <div className="flex items-center justify-between border-b border-amber-400/30 pb-3">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-amber-500 text-stone-950 flex items-center justify-center font-mono font-black text-xs">
              _k
            </div>
            <div>
              <p className="text-xs font-black tracking-wider font-heading leading-tight text-white">
                KHOPHI <span className="text-amber-400">PRESS</span>
              </p>
              <p className="text-[8px] uppercase tracking-widest text-blue-200">
                Accra, Ghana 🇬🇭
              </p>
            </div>
          </div>

          <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-amber-400 text-stone-950 uppercase tracking-wider">
            Verified Press
          </span>
        </div>

        {/* Author Photo & Profile */}
        <div className="flex items-center gap-3.5 pt-1">
          <div className="relative shrink-0">
            <Image
              src={badge.avatar || "/khophi_profile.jpg"}
              alt={badge.authorName}
              width={64}
              height={64}
              className="rounded-2xl object-cover ring-2 ring-amber-400 shadow-md h-16 w-16"
            />
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 shadow">
              <ShieldCheck className="h-3 w-3" />
            </div>
          </div>

          <div className="min-w-0 space-y-0.5">
            <h3 className="text-sm font-black text-white font-heading truncate">
              {badge.authorName}
            </h3>
            <p className="text-[11px] font-semibold text-amber-200 truncate">
              {badge.role}
            </p>
            <p className="text-[10px] text-stone-300 font-mono truncate">
              @{badge.authorHandle}
            </p>
          </div>
        </div>

        {/* Pass Details */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-[10px] font-mono">
          <div>
            <span className="text-stone-400 block text-[8px] uppercase tracking-wider">Press Pass ID</span>
            <span className="font-bold text-white">{badge.badgeCode}</span>
          </div>
          <div>
            <span className="text-stone-400 block text-[8px] uppercase tracking-wider">Valid Thru</span>
            <span className="font-bold text-emerald-400">{badge.expiryDate}</span>
          </div>
        </div>

        {/* Verification Barcode & QR */}
        <div className="p-2 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[8px] uppercase tracking-widest text-stone-400 block">
              Editorial Verification
            </span>
            <div className="h-3 w-28 bg-white/90 flex items-center justify-around rounded-sm px-1">
              <span className="h-full w-0.5 bg-black" />
              <span className="h-full w-1 bg-black" />
              <span className="h-full w-0.5 bg-black" />
              <span className="h-full w-1.5 bg-black" />
              <span className="h-full w-0.5 bg-black" />
              <span className="h-full w-1 bg-black" />
              <span className="h-full w-0.5 bg-black" />
            </div>
          </div>
          <div className="h-7 w-7 bg-white p-0.5 rounded flex items-center justify-center">
            <QrCode className="h-5 w-5 text-stone-900" />
          </div>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center justify-between pt-1 gap-2">
        <span className="text-[11px] text-stone-500 font-mono">
          Issued {badge.issueDate}
        </span>

        <div className="flex items-center gap-2">
          {onDelete && (
            <button
              onClick={() => onDelete(badge.id)}
              className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
              title="Revoke pass"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}

          <Button
            onClick={handlePrint}
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs rounded-xl border-stone-300 dark:border-stone-700 h-8"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Print Pass</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
