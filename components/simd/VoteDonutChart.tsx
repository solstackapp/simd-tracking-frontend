"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { SimdDetails } from "@/lib/api/types";
import { calculatePercentage, formatTokenAmount } from "@/lib/formatters";

interface VoteDonutChartProps {
  details: SimdDetails;
}

export function VoteDonutChart({ details }: VoteDonutChartProps) {
  const totalVoted = details.votes.yes + details.votes.no + details.votes.abstain;
  
  const data = [
    {
      name: "Yes",
      value: details.votes.yes,
      percentage: calculatePercentage(details.votes.yes, details.total_supply),
    },
    {
      name: "No",
      value: details.votes.no,
      percentage: calculatePercentage(details.votes.no, details.total_supply),
    },
    {
      name: "Abstain",
      value: details.votes.abstain,
      percentage: calculatePercentage(details.votes.abstain, details.total_supply),
    },
    {
      name: "Did Not Vote",
      value: details.unused_tokens,
      percentage: calculatePercentage(details.unused_tokens, details.total_supply),
    },
  ];

  const COLORS = {
    Yes: "#22c55e",
    No: "#ef4444",
    Abstain: "#6b7280",
    "Did Not Vote": "#1f2937",
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload[0]) {
      const data = payload[0];
      return (
        <div className="bg-card p-3 rounded-lg border border-border shadow-lg">
          <p className="font-semibold text-sm">{data.name}</p>
          <p className="text-xs text-muted-foreground">
            Tokens: {formatTokenAmount(data.value)}
          </p>
          <p className="text-xs text-muted-foreground">
            Percentage: {data.payload.percentage}%
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, name, percentage }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (parseFloat(percentage) < 5) return null;

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {percentage}%
      </text>
    );
  };

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={CustomLabel}
            outerRadius={100}
            innerRadius={60}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[entry.name as keyof typeof COLORS]} 
              />
            ))}
          </Pie>
          <Tooltip 
            content={<CustomTooltip />}
            animationDuration={200}
            animationEasing="ease-out"
            isAnimationActive={false}
          />
        </PieChart>
      </ResponsiveContainer>
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[item.name as keyof typeof COLORS] }}
            />
            <span className="text-sm text-muted-foreground">{item.name}</span>
            <span className="text-sm font-medium ml-auto">
              {item.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}