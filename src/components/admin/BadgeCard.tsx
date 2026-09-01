"use client";

import * as React from "react";
import Image from "next/image";
import { Award, Printer, CheckCircle, ShieldCheck, QrCode } from "lucide-react";
import { AuthorBadge } from "@/lib/types";
import { Button } from "@/components/ui/Button";

export function BadgeCard({ badge }: { badge: AuthorBadge }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="card-lift p-6 rounded-3xl space-y-6 flex flex-col justify-between max-w-sm mx-auto w-full border-2 border-blue-900/20 shadow-xl bg-white dark:bg-[#08214e]">
      {/* Badge Visual Pass (Printable Area) */}
      <div id={`badge-print-${badge.id}`} className="rounded-2xl bg-gradient-to-br from-[#041536] via-[#08214e] to-[#20509b] text-white p-6 relative overflow-hidden border border-blue-400/40 shadow-2xl space-y-5">
        {/* Ambient watermark & header */}
        <div className="flex items-center justify-between border-b border-blue-400/20 pb-3">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-[#f59e0b] text-[#08214e] flex items-center justify-center font-mono font-black text-xs">
              _k
            </div>
            <span className="text-xs font-black tracking-widest font-heading">
              KHOPHI <span className="text-[#f59e0b]">PRESS</span>
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-[#f59e0b] text-[#08214e] uppercase tracking-wider">
            Verified Contributor
          </span>
        </div>

        {/* Author Photo & Details */}
        <div className="flex items-center gap-4 pt-1">
          <Image
            src={badge.avatar}
            alt={badge.authorName}
            width={72}
            height={72}
            className="rounded-2xl object-cover ring-4 ring-[#fdc035] shadow-lg"
          />
          <div className="space-y-1">
            <h3 className="text-base font-extrabold text-white font-heading leading-tight">
              {badge.authorName}
            </h3>
            <p className="text-[11px] font-semibold text-[#8ab1e3]">
              {badge.role}
            </p>
            <p className="text-[10px] text-blue-200/80 font-mono">
              @{badge.authorHandle}
            </p>
          </div>
        </div>

        {/* Credentials & ID */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-blue-400/20 text-[10px] font-mono">
          <div>
            <span className="text-[#8ab1e3] block text-[9px] uppercase tracking-wider">Pass ID</span>
            <span className="font-bold text-white text-xs">{badge.badgeCode}</span>
          </div>
          <div>
            <span className="text-[#8ab1e3] block text-[9px] uppercase tracking-wider">Valid Through</span>
            <span className="font-bold text-emerald-300">{badge.expiryDate}</span>
          </div>
        </div>

        {/* Barcode / QR Section */}
        <div className="p-2.5 rounded-xl bg-[#041536]/90 border border-blue-400/20 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[8px] uppercase tracking-widest text-[#93a0b4] block">
              Cryptographic Verification
            </span>
            <div className="h-4 w-36 bg-gradient-to-r from-white via-slate-300 to-white flex items-center justify-around opacity-80">
              <span className="h-full w-0.5 bg-black" />
              <span className="h-full w-1 bg-black" />
              <span className="h-full w-0.5 bg-black" />
              <span className="h-full w-1.5 bg-black" />
              <span className="h-full w-0.5 bg-black" />
              <span className="h-full w-1 bg-black" />
            </div>
          </div>
          <div className="h-8 w-8 bg-white p-1 rounded-lg flex items-center justify-center text-black">
            <QrCode className="h-6 w-6 text-[#08214e]" />
          </div>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-[11px] text-[#93a0b4] font-medium">
          Issued on {badge.issueDate}
        </span>
        <Button
          onClick={handlePrint}
          variant="outline"
          size="sm"
          className="gap-1.5 text-xs rounded-xl border-[#b9d2f0] text-[#08214e] dark:text-white dark:border-[#1e3a6a]"
        >
          <Printer className="h-3.5 w-3.5" />
          Print ID Pass
        </Button>
      </div>
    </div>
  );
}
