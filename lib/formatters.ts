export function formatTokenAmount(amount: number): string {
  const billion = 1_000_000_000;
  const million = 1_000_000;
  const thousand = 1_000;

  if (amount >= billion) {
    return `${(amount / billion).toFixed(2)}B`;
  } else if (amount >= million) {
    return `${(amount / million).toFixed(2)}M`;
  } else if (amount >= thousand) {
    return `${(amount / thousand).toFixed(2)}K`;
  }
  return amount.toFixed(2);
}

export function calculatePercentage(amount: number, total: number): string {
  if (total === 0) return "0";
  return ((amount / total) * 100).toFixed(2);
}

export function shortenAddress(address: string, startChars = 4, endChars?: number): string {
  const end = endChars ?? startChars;
  return `${address.slice(0, startChars)}...${address.slice(-end)}`;
}

export function formatSolAmount(lamports: number): string {
  const LAMPORTS_PER_SOL = 1_000_000_000;
  const sol = lamports / LAMPORTS_PER_SOL;
  
  // Format with commas and appropriate decimal places
  if (sol >= 1000000) {
    return `${(sol / 1000000).toFixed(2)}M SOL`;
  } else if (sol >= 1000) {
    return `${(sol / 1000).toFixed(2)}K SOL`;
  }
  return `${sol.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} SOL`;
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}