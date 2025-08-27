"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useSimdDetails, useValidatorVotes } from "@/lib/api/hooks";
import { VoteDonutChart } from "@/components/simd/VoteDonutChart";
import { VoteMetrics } from "@/components/simd/VoteMetrics";
import { ValidatorTable } from "@/components/validators/ValidatorTable";
import { SimdStatusBadge } from "@/components/simd/SimdStatusBadge";
import { SimdSelector } from "@/components/simd/SimdSelector";
import { ArrowLeft } from "lucide-react";
import { VoteProgressBar } from "@/components/simd/VoteProgressBar";
import { formatTokenAmount } from "@/lib/formatters";

export default function SimdDetailPage() {
  const params = useParams();
  const title = decodeURIComponent(params.title as string);
  
  const { data: details, isLoading: detailsLoading, error: detailsError } = useSimdDetails(title);
  const { data: validators, isLoading: validatorsLoading } = useValidatorVotes(title);

  if (detailsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="text-gray-600 dark:text-zinc-400">Loading SIMD details...</div>
      </div>
    );
  }

  if (detailsError || !details) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
        <div className="container mx-auto px-4 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to SIMDs
          </Link>
          <div className="text-center py-12">
            <p className="text-red-500 mb-2 text-xl">SIMD not found</p>
            <p className="text-sm text-gray-600 dark:text-zinc-500">
              {detailsError instanceof Error ? detailsError.message : "Unknown error"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const totalVoted = details.votes.yes + details.votes.no + details.votes.abstain;
  const participationRate = details.total_supply > 0 
    ? ((totalVoted / details.total_supply) * 100).toFixed(1)
    : "0";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
          <SimdSelector currentSimd={details.title} />
        </div>

        {/* Title Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {details.title}
            </h1>
            <SimdStatusBadge status={details.status} />
          </div>
          <p className="text-gray-600 dark:text-zinc-400 text-lg">{details.description}</p>
        </div>

        {/* Key Metrics Bar */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg p-4 mb-8 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <p className="text-xs text-gray-600 dark:text-zinc-500 uppercase tracking-wider">Participation</p>
              <p className="text-xl font-semibold">{participationRate}%</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-zinc-500 uppercase tracking-wider">Total Voted</p>
              <p className="text-xl font-semibold font-mono">{formatTokenAmount(totalVoted)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-zinc-500 uppercase tracking-wider">Yes Votes</p>
              <p className="text-xl font-semibold text-green-600 dark:text-green-500">{formatTokenAmount(details.votes.yes)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-zinc-500 uppercase tracking-wider">No Votes</p>
              <p className="text-xl font-semibold text-red-600 dark:text-red-500">{formatTokenAmount(details.votes.no)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 dark:text-zinc-500 uppercase tracking-wider">Epochs</p>
              <p className="text-xl font-semibold">{details.starting_epoch} - {details.ending_epoch}</p>
            </div>
          </div>
        </div>

        {/* Vote Distribution */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Vote Distribution</h2>
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg p-6 shadow-sm">
            <VoteProgressBar details={details} />
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-100 dark:bg-zinc-800/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-sm text-gray-600 dark:text-zinc-400">Yes</span>
                </div>
                <p className="text-lg font-semibold">{formatTokenAmount(details.votes.yes)}</p>
                <p className="text-xs text-gray-500 dark:text-zinc-500">
                  {totalVoted > 0 ? ((details.votes.yes / totalVoted) * 100).toFixed(1) : "0"}%
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-zinc-800/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <span className="text-sm text-gray-600 dark:text-zinc-400">No</span>
                </div>
                <p className="text-lg font-semibold">{formatTokenAmount(details.votes.no)}</p>
                <p className="text-xs text-gray-500 dark:text-zinc-500">
                  {totalVoted > 0 ? ((details.votes.no / totalVoted) * 100).toFixed(1) : "0"}%
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-zinc-800/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 bg-gray-400 dark:bg-zinc-600 rounded-full" />
                  <span className="text-sm text-gray-600 dark:text-zinc-400">Abstain</span>
                </div>
                <p className="text-lg font-semibold">{formatTokenAmount(details.votes.abstain)}</p>
                <p className="text-xs text-gray-500 dark:text-zinc-500">
                  {totalVoted > 0 ? ((details.votes.abstain / totalVoted) * 100).toFixed(1) : "0"}%
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-zinc-800/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 bg-gray-300 dark:bg-zinc-700 rounded-full" />
                  <span className="text-sm text-gray-600 dark:text-zinc-400">Did Not Vote</span>
                </div>
                <p className="text-lg font-semibold">{formatTokenAmount(details.unused_tokens)}</p>
                <p className="text-xs text-gray-500 dark:text-zinc-500">
                  {details.total_supply > 0 ? ((details.unused_tokens / details.total_supply) * 100).toFixed(1) : "0"}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Validator Votes Section */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-6 flex items-center justify-between">
            <span>Validator Votes</span>
            {validators && validators.length > 0 && (
              <span className="text-sm text-gray-600 dark:text-zinc-500">
                {validators.length} validators
              </span>
            )}
          </h2>
          {validatorsLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-gray-600 dark:text-zinc-400">Loading validator votes...</div>
            </div>
          ) : validators && validators.length > 0 ? (
            <ValidatorTable validators={validators} />
          ) : (
            <div className="text-center py-12 text-gray-600 dark:text-zinc-500">
              No validator votes recorded yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}