"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { motion } from "framer-motion";
import { SimdDetails } from "@/lib/api/types";
import { calculatePercentage, formatTokenAmount } from "@/lib/formatters";
import { useState } from "react";

interface VoteDonutChartProps {
  details: SimdDetails;
}

export function VoteDonutChart({ details }: VoteDonutChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
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
    Yes: "#14F195",
    No: "#ef4444",
    Abstain: "#6b7280",
    "Did Not Vote": "#1f2937",
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload[0]) {
      const data = payload[0];
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-effect p-3 rounded-lg border border-border/50 shadow-xl"
        >
          <p className="font-semibold text-sm">{data.name}</p>
          <p className="text-xs text-muted-foreground">
            Tokens: {formatTokenAmount(data.value)}
          </p>
          <p className="text-xs text-muted-foreground">
            Percentage: {data.payload.percentage}%
          </p>
        </motion.div>
      );
    }
    return null;
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, name, percentage, index }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (parseFloat(percentage) < 3) return null;

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-xs font-medium"
        style={{ 
          filter: activeIndex === index ? "brightness(1.2)" : "brightness(1)",
          fontWeight: activeIndex === index ? "bold" : "normal"
        }}
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
            label={(props) => <CustomLabel {...props} />}
            outerRadius={100}
            innerRadius={60}
            fill="#8884d8"
            dataKey="value"
            animationBegin={0}
            animationDuration={800}
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(undefined)}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[entry.name as keyof typeof COLORS]}
                style={{
                  filter: activeIndex === index ? "brightness(1.2)" : "brightness(1)",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
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
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-2 gap-4 mt-4"
      >
        {data.map((item, index) => (
          <motion.div 
            key={item.name}
            whileHover={{ scale: 1.05 }}
            className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all ${
              activeIndex === index ? "bg-secondary/50" : ""
            }`}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(undefined)}
          >
            <motion.div
              animate={{ 
                scale: activeIndex === index ? 1.2 : 1 
              }}
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[item.name as keyof typeof COLORS] }}
            />
            <span className="text-sm text-muted-foreground">{item.name}</span>
            <span className="text-sm font-medium ml-auto">
              {item.percentage}%
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}