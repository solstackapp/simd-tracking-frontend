"use client";

import { useRouter } from "next/navigation";
import { useSimds } from "@/lib/api/hooks";
import { ChevronDown } from "lucide-react";

interface SimdSelectorProps {
  currentSimd: string;
}

export function SimdSelector({ currentSimd }: SimdSelectorProps) {
  const router = useRouter();
  const { data: simds, isLoading } = useSimds();

  const handleSimdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSimd = e.target.value;
    if (selectedSimd && selectedSimd !== currentSimd) {
      router.push(`/simd/${selectedSimd}`);
    }
  };

  if (isLoading || !simds) {
    return (
      <div className="relative inline-block">
        <select 
          disabled
          className="appearance-none bg-secondary/50 text-foreground pl-4 pr-10 py-2 rounded-lg cursor-not-allowed opacity-50"
        >
          <option>Loading...</option>
        </select>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground hidden sm:inline">Switch to:</span>
      <div className="relative">
        <select
          value={currentSimd}
          onChange={handleSimdChange}
          className="appearance-none bg-card hover:bg-secondary/70 text-foreground font-medium pl-4 pr-10 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:bg-secondary cursor-pointer transition-colors min-w-[180px] sm:min-w-[220px]"
        >
          <option value="" disabled>Select a SIMD</option>
          {simds.map((simd) => (
            <option key={simd.title} value={simd.title}>
              {simd.title} - {simd.status}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-muted-foreground" />
      </div>
    </div>
  );
}