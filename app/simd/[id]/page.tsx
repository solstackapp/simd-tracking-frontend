"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useSimdDetails, useValidatorVotes } from "@/lib/api/hooks";
import { ValidatorTable } from "@/components/validators/ValidatorTable";
import { SimdStatusBadge } from "@/components/simd/SimdStatusBadge";
import { SimdSelector } from "@/components/simd/SimdSelector";
import { ArrowLeft, Download } from "lucide-react";
import { VoteProgressBar } from "@/components/simd/VoteProgressBar";
import { formatTokenAmount } from "@/lib/formatters";
import { getProposalStatus, getVotingStats } from "@/lib/voting";

export default function SimdDetailPage() {
  const params = useParams();
  const id = decodeURIComponent(params.id as string);
  
  const { data: details, isLoading: detailsLoading, error: detailsError } = useSimdDetails(id);
  const { data: validators, isLoading: validatorsLoading } = useValidatorVotes(id);

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
  
  const displayStatus = getProposalStatus(details);
  const votingStats = getVotingStats(details);

  const exportData = () => {
    const exportObject = {
      simd: {
        ...details,
        computedStatus: displayStatus,
        votingStats: votingStats
      },
      validators: validators || [],
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(exportObject, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `simd-${details.id}-export-${new Date().toISOString()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
          <SimdSelector currentSimd={details.title} />
        </div>

        {/* Page Header with Title and Actions */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {details.title}
              </h1>
              <SimdStatusBadge status={displayStatus} />
            </div>
            <p className="text-sm text-gray-600 dark:text-zinc-400">{details.description}</p>
          </div>
          <button
            onClick={exportData}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-zinc-700 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
            title="Export SIMD data"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
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
            
            {/* Voting Requirements Info */}
            {details.status === "Ended" && (
              <div className="mt-4 p-3 bg-gray-50 dark:bg-zinc-800/30 rounded-lg">
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-zinc-400">Quorum (33% required):</span>
                    <span className={votingStats.hasQuorum ? "text-green-600 dark:text-green-500 font-medium" : "text-red-600 dark:text-red-500 font-medium"}>
                      {votingStats.quorumRate.toFixed(1)}% {votingStats.hasQuorum ? "✓" : "✗"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-zinc-400">Yes votes (66.7% required):</span>
                    <span className={votingStats.isPassed ? "text-green-600 dark:text-green-500 font-medium" : "text-red-600 dark:text-red-500 font-medium"}>
                      {votingStats.yesPercentage.toFixed(1)}% {votingStats.isPassed ? "✓" : "✗"}
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            {details.status === "Active" && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  <strong>Voting Requirements:</strong> 33% quorum • 66.7% Yes votes to pass
                </p>
              </div>
            )}
            
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
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <span className="text-sm text-gray-600 dark:text-zinc-400">Abstain</span>
                </div>
                <p className="text-lg font-semibold">{formatTokenAmount(details.votes.abstain)}</p>
                <p className="text-xs text-gray-500 dark:text-zinc-500">
                  {totalVoted > 0 ? ((details.votes.abstain / totalVoted) * 100).toFixed(1) : "0"}%
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-zinc-800/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 bg-gray-200 dark:bg-zinc-800 rounded-full" />
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