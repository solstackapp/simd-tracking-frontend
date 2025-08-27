import { SimdDetails, SimdStatus } from "./api/types";

/**
 * Check if the proposal has met quorum (33% of total supply)
 * Abstentions count towards quorum
 */
export function hasQuorum(details: SimdDetails): boolean {
  const totalVoted = details.votes.yes + details.votes.no + details.votes.abstain;
  const quorumThreshold = 0.33;
  return (totalVoted / details.total_supply) >= quorumThreshold;
}

/**
 * Check if the proposal has passed (yes >= 2/3 of yes+no votes)
 * Note: Abstentions don't count for/against passing, only for quorum
 */
export function isPassed(details: SimdDetails): boolean {
  const yesVotes = details.votes.yes;
  const noVotes = details.votes.no;
  const totalVotes = yesVotes + noVotes;
  
  // If no one voted yes or no, it fails
  if (totalVotes === 0) return false;
  
  const passingThreshold = 2 / 3;
  return (yesVotes / totalVotes) >= passingThreshold;
}

/**
 * Get the computed status for a proposal
 * Returns "Passed" or "Failed" for ended proposals, or the original status otherwise
 */
export function getProposalStatus(details: SimdDetails): SimdStatus | "Passed" | "Failed" {
  if (details.status !== "Ended") {
    return details.status;
  }
  
  // Check if quorum was met
  if (!hasQuorum(details)) {
    return "Failed"; // Failed due to no quorum
  }
  
  // Check if proposal passed
  return isPassed(details) ? "Passed" : "Failed";
}

/**
 * Get detailed voting statistics
 */
export function getVotingStats(details: SimdDetails) {
  const totalVoted = details.votes.yes + details.votes.no + details.votes.abstain;
  const yesNoTotal = details.votes.yes + details.votes.no;
  
  return {
    participationRate: details.total_supply > 0 ? (totalVoted / details.total_supply) * 100 : 0,
    quorumRate: details.total_supply > 0 ? (totalVoted / details.total_supply) * 100 : 0,
    yesPercentage: yesNoTotal > 0 ? (details.votes.yes / yesNoTotal) * 100 : 0,
    hasQuorum: hasQuorum(details),
    isPassed: details.status === "Ended" ? isPassed(details) : null,
    requiredForQuorum: Math.max(0, Math.ceil(details.total_supply * 0.33 - totalVoted)),
    requiredForPassing: yesNoTotal > 0 ? Math.max(0, Math.ceil(yesNoTotal * (2/3) - details.votes.yes)) : 0
  };
}