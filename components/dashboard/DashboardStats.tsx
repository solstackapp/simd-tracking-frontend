"use client";

import { SimdSummary, SimdDetails } from "@/lib/api/types";
import { Activity, Users, TrendingUp, Clock } from "lucide-react";

interface DashboardStatsProps {
  simds: SimdSummary[];
  details: Record<string, SimdDetails | undefined>;
}

interface StatProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: "up" | "down" | "neutral";
}

function Stat({ label, value, icon, trend }: StatProps) {
  const getTrendColor = () => {
    switch (trend) {
      case "up": return "text-green-600 dark:text-green-500";
      case "down": return "text-red-600 dark:text-red-500";
      default: return "text-gray-500 dark:text-zinc-400";
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className={`${getTrendColor()}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-600 dark:text-zinc-500 uppercase tracking-wider">{label}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
}

export function DashboardStats({ simds, details }: DashboardStatsProps) {
  // Calculate statistics
  const activeSimds = simds.filter(s => s.status === "Active").length;
  
  const totalVotesCast = Object.values(details).reduce((acc, detail) => {
    if (!detail) return acc;
    return acc + detail.votes.yes + detail.votes.no + detail.votes.abstain;
  }, 0);
  
  const averageParticipation = Object.values(details).reduce((acc, detail, _, arr) => {
    if (!detail || detail.total_supply === 0) return acc;
    const participation = ((detail.votes.yes + detail.votes.no + detail.votes.abstain) / detail.total_supply) * 100;
    return acc + participation / arr.length;
  }, 0);
  
  const recentSimd = simds.reduce((latest, current) => {
    return current.starting_epoch > latest.starting_epoch ? current : latest;
  }, simds[0]);
  
  return (
    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg p-6 mb-8 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Stat
          label="Active SIMDs"
          value={activeSimds}
          icon={<Activity className="w-5 h-5" />}
          trend={activeSimds > 0 ? "up" : "neutral"}
        />
        <Stat
          label="Total Votes"
          value={`${Math.floor(totalVotesCast / 1e15)}M`}
          icon={<Users className="w-5 h-5" />}
        />
        <Stat
          label="Avg. Participation"
          value={`${averageParticipation.toFixed(1)}%`}
          icon={<TrendingUp className="w-5 h-5" />}
          trend={averageParticipation > 50 ? "up" : averageParticipation > 25 ? "neutral" : "down"}
        />
        <Stat
          label="Latest"
          value={recentSimd?.title.replace("SIMD-", "") || "N/A"}
          icon={<Clock className="w-5 h-5" />}
        />
      </div>
    </div>
  );
}