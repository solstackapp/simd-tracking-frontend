"use client";

import { SimdDetails } from "@/lib/api/types";

interface VoteProgressBarProps {
  details: SimdDetails | undefined;
  compact?: boolean;
}

export function VoteProgressBar({ details, compact = false }: VoteProgressBarProps) {
  if (!details) return null;
  
  const totalVoted = details.votes.yes + details.votes.no + details.votes.abstain;
  if (totalVoted === 0) return null;
  
  const yesPercent = (details.votes.yes / totalVoted) * 100;
  const noPercent = (details.votes.no / totalVoted) * 100;
  const abstainPercent = (details.votes.abstain / totalVoted) * 100;
  
  return (
    <div className="w-full">
      {!compact && (
        <div className="flex justify-between text-xs text-gray-600 dark:text-zinc-500 mb-1">
          <span>Vote Distribution</span>
          <span>{((totalVoted / details.total_supply) * 100).toFixed(1)}% Participation</span>
        </div>
      )}
      <div className="relative h-2 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
        <div className="absolute inset-0 flex">
          <div
            style={{ width: `${yesPercent}%` }}
            className="h-full bg-green-500"
            title={`Yes: ${yesPercent.toFixed(1)}%`}
          />
          <div
            style={{ width: `${noPercent}%` }}
            className="h-full bg-red-500"
            title={`No: ${noPercent.toFixed(1)}%`}
          />
          <div
            style={{ width: `${abstainPercent}%` }}
            className="h-full bg-yellow-500 dark:bg-yellow-600"
            title={`Abstain: ${abstainPercent.toFixed(1)}%`}
          />
        </div>
      </div>
      {!compact && (
        <div className="flex justify-between mt-1">
          <div className="flex gap-4 text-xs">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              Yes {yesPercent.toFixed(1)}%
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              No {noPercent.toFixed(1)}%
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              Abstain {abstainPercent.toFixed(1)}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
}