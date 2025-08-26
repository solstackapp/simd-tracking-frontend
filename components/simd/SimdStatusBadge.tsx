import { SimdStatus } from "@/lib/api/types";
import { cn } from "@/lib/utils";

interface SimdStatusBadgeProps {
  status: SimdStatus;
}

export function SimdStatusBadge({ status }: SimdStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        {
          "bg-green-900/30 text-green-500 border border-green-500/20":
            status === "Active",
          "bg-gray-900/30 text-gray-400 border border-gray-500/20":
            status === "Ended",
          "bg-yellow-900/30 text-yellow-500 border border-yellow-500/20":
            status === "Upcoming",
        }
      )}
    >
      {status}
    </span>
  );
}