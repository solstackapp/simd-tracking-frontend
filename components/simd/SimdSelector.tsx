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
          className="appearance-none bg-gray-100 dark:bg-zinc-900 text-gray-400 dark:text-zinc-400 pl-4 pr-10 py-2 rounded-lg cursor-not-allowed opacity-50 border border-gray-300 dark:border-zinc-800"
        >
          <option>Loading...</option>
        </select>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600 dark:text-zinc-500 hidden sm:inline">Switch to:</span>
      <div className="relative">
        <select
          value={currentSimd}
          onChange={handleSimdChange}
          className="appearance-none bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-900 dark:text-white pl-4 pr-10 py-2 rounded-lg border border-gray-300 dark:border-zinc-800 focus:outline-none focus:border-purple-500/50 cursor-pointer transition-colors min-w-[180px] sm:min-w-[220px]"
        >
          <option value="" disabled>Select a SIMD</option>
          {simds.map((simd) => (
            <option key={simd.id} value={simd.id}>
              {simd.title} - {simd.status}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-500 dark:text-zinc-500" />
      </div>
    </div>
  );
}