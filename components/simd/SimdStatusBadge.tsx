import { SimdStatus } from "@/lib/api/types";
import { cn } from "@/lib/utils";

interface SimdStatusBadgeProps {
  status: SimdStatus;
}

export function SimdStatusBadge({ status }: SimdStatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case "Active":
        return {
          bg: "bg-green-100 dark:bg-green-500/10",
          text: "text-green-700 dark:text-green-500",
          border: "border-green-300 dark:border-green-500/20",
        };
      case "Upcoming":
        return {
          bg: "bg-blue-100 dark:bg-blue-500/10",
          text: "text-blue-700 dark:text-blue-500",
          border: "border-blue-300 dark:border-blue-500/20",
        };
      case "Ended":
        return {
          bg: "bg-gray-100 dark:bg-zinc-800",
          text: "text-gray-600 dark:text-zinc-500",
          border: "border-gray-300 dark:border-zinc-700",
        };
      default:
        return {
          bg: "bg-gray-100 dark:bg-zinc-800",
          text: "text-gray-600 dark:text-zinc-500",
          border: "border-gray-300 dark:border-zinc-700",
        };
    }
  };

  const styles = getStatusStyles();

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border",
        styles.bg,
        styles.text,
        styles.border
      )}
    >
      {status === "Active" && (
        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5" />
      )}
      {status}
    </span>
  );
}