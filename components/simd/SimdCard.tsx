"use client";

import Link from "next/link";
import { SimdSummary, SimdDetails } from "@/lib/api/types";
import { SimdStatusBadge } from "./SimdStatusBadge";
import { VoteProgressBar } from "./VoteProgressBar";
import { useSimdDetails } from "@/lib/api/hooks";
import { ChevronRight, Clock, Users } from "lucide-react";

interface SimdCardProps {
  simd: SimdSummary;
  index?: number;
}

export function SimdCard({ simd, index = 0 }: SimdCardProps) {
  const { data: details } = useSimdDetails(simd.id);

  const getParticipationRate = (details: SimdDetails | undefined) => {
    if (!details || details.total_supply === 0) return 0;
    const totalVoted = details.votes.yes + details.votes.no + details.votes.abstain;
    return (totalVoted / details.total_supply) * 100;
  };

  const participationRate = getParticipationRate(details);

  return (
    <Link
      href={`/simd/${simd.id}`}
      className="block bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-900/80 border border-gray-200 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700 rounded-lg p-6 transition-all duration-200 shadow-sm hover:shadow-md dark:shadow-none"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              {simd.title}
            </h3>
            <SimdStatusBadge status={simd.status} />
          </div>
          <p className="text-gray-600 dark:text-zinc-400 text-sm line-clamp-1">
            {simd.description}
          </p>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400 dark:text-zinc-600 mt-1" />
      </div>

      {/* Progress Bar */}
      {details && simd.status !== "Upcoming" && (
        <div className="mb-3">
          <VoteProgressBar details={details} compact />
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4 text-gray-500 dark:text-zinc-500">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Epochs {simd.starting_epoch} - {simd.ending_epoch}
          </span>
          {participationRate > 0 && (
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {participationRate.toFixed(1)}%
            </span>
          )}
        </div>
        
        {/* Status indicator */}
        {simd.status === "Active" && (
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-xs text-green-500">Live</span>
          </div>
        )}
      </div>
    </Link>
  );
}