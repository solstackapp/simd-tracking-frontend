"use client";

import { SimdSummary } from "@/lib/api/types";
import { SimdCard } from "./SimdCard";

interface SimdListProps {
  simds: SimdSummary[];
}

export function SimdList({ simds }: SimdListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {simds.length > 0 ? (
        simds.map((simd, index) => (
          <SimdCard key={simd.title} simd={simd} index={index} />
        ))
      ) : (
        <div className="col-span-2 text-center py-12 text-zinc-500">
          No SIMDs found
        </div>
      )}
    </div>
  );
}