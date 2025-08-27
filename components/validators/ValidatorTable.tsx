"use client";

import { useState, useMemo } from "react";
import { ValidatorVote } from "@/lib/api/types";
import { formatTokenAmount, shortenAddress } from "@/lib/formatters";
import { Search, Copy, ChevronUp, ChevronDown, CheckCircle, XCircle, MinusCircle } from "lucide-react";
import toast from "react-hot-toast";

interface ValidatorTableProps {
  validators: ValidatorVote[];
}

type SortField = "validator" | "vote" | "amount";
type SortDirection = "asc" | "desc";

export function ValidatorTable({ validators }: ValidatorTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("amount");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  
  const itemsPerPage = 50;

  const getVoteType = (vote: ValidatorVote): string => {
    if (vote.yes_amount > 0) return "Yes";
    if (vote.no_amount > 0) return "No";
    if (vote.abstain_amount > 0) return "Abstain";
    return "No Vote";
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const copyToClipboard = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    toast.success("Address copied to clipboard!", {
      duration: 2000,
      style: {
        background: "hsl(var(--card))",
        color: "hsl(var(--foreground))",
        border: "1px solid hsl(var(--border))",
      },
    });
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const filteredAndSortedValidators = useMemo(() => {
    let filtered = validators.filter((v) =>
      v.validator.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortField) {
        case "validator":
          aValue = a.validator;
          bValue = b.validator;
          break;
        case "vote":
          aValue = getVoteType(a);
          bValue = getVoteType(b);
          break;
        case "amount":
          aValue = a.total_amount;
          bValue = b.total_amount;
          break;
        default:
          return 0;
      }

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [validators, searchTerm, sortField, sortDirection]);

  const paginatedValidators = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedValidators.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedValidators, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedValidators.length / itemsPerPage);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <div className="w-4 h-4" />;
    }
    return sortDirection === "asc" ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  return (
    <div>
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-zinc-500" />
          <input
            type="text"
            placeholder="Search validator address..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-800 rounded-lg focus:outline-none focus:border-purple-500/50 transition-colors text-gray-900 dark:text-white"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-zinc-800">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900">
              <th
                className="text-left py-3 px-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                onClick={() => handleSort("validator")}
              >
                <div className="flex items-center gap-2">
                  Validator
                  <SortIcon field="validator" />
                </div>
              </th>
              <th
                className="text-left py-3 px-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                onClick={() => handleSort("vote")}
              >
                <div className="flex items-center gap-2">
                  Vote
                  <SortIcon field="vote" />
                </div>
              </th>
              <th
                className="text-right py-3 px-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                onClick={() => handleSort("amount")}
              >
                <div className="flex items-center justify-end gap-2">
                  Amount
                  <SortIcon field="amount" />
                </div>
              </th>
              <th className="text-right py-3 px-4">Transactions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedValidators.map((validator, index) => {
              const voteType = getVoteType(validator);
              const voteColorClass =
                voteType === "Yes"
                  ? "text-green-500"
                  : voteType === "No"
                  ? "text-red-500"
                  : voteType === "Abstain"
                  ? "text-gray-500"
                  : "text-muted-foreground";

              return (
                <tr
                  key={validator.validator}
                  className="border-b border-gray-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">
                        {shortenAddress(validator.validator, 6)}
                      </span>
                      <button
                        onClick={() => copyToClipboard(validator.validator)}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded transition-colors"
                        title="Copy address"
                      >
                        <Copy className="w-3 h-3 text-gray-500 dark:text-zinc-500" />
                      </button>
                      {copiedAddress === validator.validator && (
                        <span className="text-xs text-green-500">Copied!</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {voteType === "Yes" && <CheckCircle className="w-4 h-4 text-green-500" />}
                      {voteType === "No" && <XCircle className="w-4 h-4 text-red-500" />}
                      {voteType === "Abstain" && <MinusCircle className="w-4 h-4 text-gray-500" />}
                      <span className={`font-medium ${voteColorClass}`}>
                        {voteType}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-sm">
                    {formatTokenAmount(validator.total_amount)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {validator.transaction_count}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-zinc-500">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredAndSortedValidators.length)} of{" "}
            {filteredAndSortedValidators.length} validators
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-lg bg-white dark:bg-zinc-900 hover:bg-gray-100 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-gray-300 dark:border-zinc-800 text-gray-700 dark:text-white"
            >
              First
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-lg bg-white dark:bg-zinc-900 hover:bg-gray-100 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-gray-300 dark:border-zinc-800 text-gray-700 dark:text-white"
            >
              Previous
            </button>
            <span className="px-3 py-1">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-lg bg-white dark:bg-zinc-900 hover:bg-gray-100 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-gray-300 dark:border-zinc-800 text-gray-700 dark:text-white"
            >
              Next
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-lg bg-white dark:bg-zinc-900 hover:bg-gray-100 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-gray-300 dark:border-zinc-800 text-gray-700 dark:text-white"
            >
              Last
            </button>
          </div>
        </div>
      )}
    </div>
  );
}