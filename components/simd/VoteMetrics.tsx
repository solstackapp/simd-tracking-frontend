import { SimdDetails } from "@/lib/api/types";
import { formatTokenAmount, calculatePercentage } from "@/lib/formatters";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Activity, PieChart, Users, Clock } from "lucide-react";

interface VoteMetricsProps {
  details: SimdDetails;
}

interface MetricCardProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  delay?: number;
}

function MetricCard({ label, value, icon, trend, delay = 0 }: MetricCardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case "up": return "text-green-500";
      case "down": return "text-red-500";
      default: return "text-muted-foreground";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.05 }}
      className="group"
    >
      <div className="bg-secondary/30 hover:bg-secondary/50 backdrop-blur-sm rounded-lg p-4 transition-all border border-border/30 hover:border-border/50">
        <div className="flex items-start justify-between mb-2">
          <p className="text-xs text-muted-foreground">{label}</p>
          {icon && (
            <div className={`${getTrendColor()} opacity-50 group-hover:opacity-100 transition-opacity`}>
              {icon}
            </div>
          )}
        </div>
        <p className="text-lg font-semibold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text">
          {value}
        </p>
      </div>
    </motion.div>
  );
}

export function VoteMetrics({ details }: VoteMetricsProps) {
  const totalVoted = details.votes.yes + details.votes.no + details.votes.abstain;
  const participationRate = calculatePercentage(totalVoted, details.total_supply);
  
  const getResult = () => {
    if (details.status === "Upcoming") return { text: "Not Started", icon: <Clock className="w-4 h-4" /> };
    if (details.status === "Active") return { text: "Voting Active", icon: <Activity className="w-4 h-4" /> };
    
    const yesPercentage = totalVoted > 0 ? (details.votes.yes / totalVoted) * 100 : 0;
    if (yesPercentage > 66) {
      return { text: "Passed", icon: <TrendingUp className="w-4 h-4" />, trend: "up" as const };
    } else if (yesPercentage > 50) {
      return { text: "Likely Pass", icon: <TrendingUp className="w-4 h-4" />, trend: "up" as const };
    } else {
      return { text: "Failed", icon: <TrendingDown className="w-4 h-4" />, trend: "down" as const };
    }
  };

  const result = getResult();

  const metrics = [
    { 
      label: "Status", 
      value: details.status,
      icon: <Activity className="w-4 h-4" />
    },
    { 
      label: "Result", 
      value: result.text,
      icon: result.icon,
      trend: result.trend
    },
    { 
      label: "Total Supply", 
      value: formatTokenAmount(details.total_supply),
      icon: <PieChart className="w-4 h-4" />
    },
    { 
      label: "Total Voted", 
      value: formatTokenAmount(totalVoted),
      icon: <Users className="w-4 h-4" />
    },
    { 
      label: "Participation Rate", 
      value: `${participationRate}%`,
      icon: participationRate > 50 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />,
      trend: participationRate > 50 ? "up" as const : "down" as const
    },
    { 
      label: "Voting Period", 
      value: `Epochs ${details.starting_epoch} - ${details.ending_epoch}`,
      icon: <Clock className="w-4 h-4" />
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {metrics.map((metric, index) => (
        <MetricCard 
          key={metric.label} 
          {...metric} 
          delay={index * 0.05}
        />
      ))}
    </div>
  );
}