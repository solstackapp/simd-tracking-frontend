import { SimdDetails } from "@/lib/api/types";
import { formatTokenAmount, calculatePercentage } from "@/lib/formatters";

interface VoteMetricsProps {
  details: SimdDetails;
}

export function VoteMetrics({ details }: VoteMetricsProps) {
  const totalVoted = details.votes.yes + details.votes.no + details.votes.abstain;
  const participationRate = calculatePercentage(totalVoted, details.total_supply);
  
  const getResult = () => {
    const yesPercentage = (details.votes.yes / totalVoted) * 100;
    if (details.status === "Ended") {
      return yesPercentage > 50 ? "Passed" : "Failed";
    }
    return "In Progress";
  };

  const metrics = [
    { label: "Status", value: details.status },
    { label: "Result", value: getResult() },
    { label: "Total Supply", value: formatTokenAmount(details.total_supply) },
    { label: "Total Voted", value: formatTokenAmount(totalVoted) },
    { label: "Participation Rate", value: `${participationRate}%` },
    { label: "Voting Period", value: `Epochs ${details.starting_epoch} - ${details.ending_epoch}` },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="bg-secondary/30 rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-1">{metric.label}</p>
          <p className="text-lg font-semibold">
            {metric.value}
          </p>
        </div>
      ))}
    </div>
  );
}