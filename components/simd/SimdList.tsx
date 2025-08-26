"use client";

import { useState } from "react";
import { SimdSummary, SimdStatus } from "@/lib/api/types";
import { SimdCard } from "./SimdCard";

interface SimdListProps {
  simds: SimdSummary[];
}

export function SimdList({ simds }: SimdListProps) {
  const [filter, setFilter] = useState<SimdStatus | "All">("All");

  const filteredSimds = simds.filter((simd) => {
    if (filter === "All") return true;
    return simd.status === filter;
  });

  const statuses: (SimdStatus | "All")[] = ["All", "Active", "Ended", "Upcoming"];

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === status
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {filteredSimds.length > 0 ? (
          filteredSimds.map((simd) => (
            <SimdCard key={simd.title} simd={simd} />
          ))
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No SIMDs found with status: {filter}
          </div>
        )}
      </div>
    </div>
  );
}