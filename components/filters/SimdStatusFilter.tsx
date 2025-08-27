"use client";

import { SimdStatus } from "@/lib/api/types";

interface SimdStatusFilterProps {
  value: SimdStatus | "All";
  onChange: (value: SimdStatus | "All") => void;
}

export function SimdStatusFilter({ value, onChange }: SimdStatusFilterProps) {
  const statuses: (SimdStatus | "All")[] = ["All", "Active", "Ended", "Upcoming"];
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600 dark:text-zinc-500">Status:</span>
      <div className="flex gap-1">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => onChange(status)}
            className={`px-3 py-1 rounded-md text-sm transition-colors ${
              value === status
                ? "bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400 border border-purple-300 dark:border-purple-500/50"
                : "bg-white dark:bg-zinc-900 text-gray-600 dark:text-zinc-400 border border-gray-300 dark:border-zinc-800 hover:border-gray-400 dark:hover:border-zinc-700"
            }`}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
}