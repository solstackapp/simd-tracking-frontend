"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useSimdDetails, useValidatorVotes } from "@/lib/api/hooks";
import { VoteDonutChart } from "@/components/simd/VoteDonutChart";
import { VoteMetrics } from "@/components/simd/VoteMetrics";
import { ValidatorTable } from "@/components/validators/ValidatorTable";
import { SimdStatusBadge } from "@/components/simd/SimdStatusBadge";
import { SimdSelector } from "@/components/simd/SimdSelector";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function SimdDetailPage() {
  const params = useParams();
  const title = decodeURIComponent(params.title as string);
  
  const { data: details, isLoading: detailsLoading, error: detailsError } = useSimdDetails(title);
  const { data: validators, isLoading: validatorsLoading } = useValidatorVotes(title);

  if (detailsLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (detailsError || !details) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to SIMDs
        </Link>
        <div className="text-center py-12">
          <p className="text-destructive mb-2">SIMD not found</p>
          <p className="text-sm text-muted-foreground">
            {detailsError instanceof Error ? detailsError.message : "Unknown error"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to SIMDs</span>
          <span className="sm:hidden">Back</span>
        </Link>
        <SimdSelector currentSimd={details.title} />
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-3xl font-bold">{details.title}</h1>
          <SimdStatusBadge status={details.status} />
        </div>
        <p className="text-muted-foreground">{details.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Vote Distribution</h2>
          <VoteDonutChart details={details} />
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Metrics</h2>
          <VoteMetrics details={details} />
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Validator Votes</h2>
        {validatorsLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : validators && validators.length > 0 ? (
          <ValidatorTable validators={validators} />
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No validator votes recorded yet
          </div>
        )}
      </div>
    </div>
  );
}