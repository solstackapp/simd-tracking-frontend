"use client";

import { useSimds } from "@/lib/api/hooks";
import { SimdList } from "@/components/simd/SimdList";
import { Loader2 } from "lucide-react";

export default function HomePage() {
  const { data: simds, isLoading, error } = useSimds();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-destructive mb-2">Failed to load SIMDs</p>
          <p className="text-sm text-muted-foreground">
            {error instanceof Error ? error.message : "Unknown error"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          SIMD Vote Tracking Dashboard
        </h1>
        <p className="text-muted-foreground">
          Track voting status and validator participation for Solana governance proposals
        </p>
      </div>

      {simds && <SimdList simds={simds} />}
    </div>
  );
}