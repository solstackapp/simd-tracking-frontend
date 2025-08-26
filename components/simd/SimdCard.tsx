"use client";

import Link from "next/link";
import { SimdSummary, SimdDetails } from "@/lib/api/types";
import { SimdStatusBadge } from "./SimdStatusBadge";
import { useSimdDetails } from "@/lib/api/hooks";
import { calculatePercentage, formatTokenAmount } from "@/lib/formatters";
import { ChevronRight } from "lucide-react";

interface SimdCardProps {
  simd: SimdSummary;
}

export function SimdCard({ simd }: SimdCardProps) {
  const { data: details } = useSimdDetails(simd.title);

  const getVotePercentages = (details: SimdDetails | undefined) => {
    if (!details) return null;
    
    const totalVoted = details.votes.yes + details.votes.no + details.votes.abstain;
    if (totalVoted === 0) return null;
    
    return {
      yes: calculatePercentage(details.votes.yes, totalVoted),
      no: calculatePercentage(details.votes.no, totalVoted),
      abstain: calculatePercentage(details.votes.abstain, totalVoted),
    };
  };

  const percentages = getVotePercentages(details);

  return (
    <Link
      href={`/simd/${simd.title}`}
      className="block bg-card hover:bg-secondary/50 border border-border rounded-lg p-6 transition-all hover:shadow-lg"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold">{simd.title}</h3>
            <SimdStatusBadge status={simd.status} />
          </div>
          <p className="text-muted-foreground text-sm">{simd.description}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground mt-1" />
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div>
          Epochs: {simd.starting_epoch} - {simd.ending_epoch}
        </div>
        
        {percentages && (
          <div className="flex items-center gap-4">
            <span className="text-green-500">Yes: {percentages.yes}%</span>
            <span className="text-red-500">No: {percentages.no}%</span>
            <span className="text-gray-500">Abstain: {percentages.abstain}%</span>
          </div>
        )}
      </div>
      
      {details && simd.status !== "Upcoming" && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Total Voted: {formatTokenAmount(details.votes.yes + details.votes.no + details.votes.abstain)}</span>
            <span>Total Supply: {formatTokenAmount(details.total_supply)}</span>
          </div>
        </div>
      )}
    </Link>
  );
}