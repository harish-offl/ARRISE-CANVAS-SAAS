import * as React from "react";
import { cn } from "../../lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  color?: "orange" | "success" | "warning" | "error";
  showLabel?: boolean;
}

export function Progress({
  value,
  max = 100,
  size = "md",
  color = "orange",
  showLabel = false,
  className,
  ...props
}: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const colors = {
    orange: "bg-orange",
    success: "bg-success",
    warning: "bg-warning",
    error: "bg-error",
  };
  const sizes = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };
  return (
    <div className={cn("flex flex-col gap-1", className)} {...props}>
      <div
        className={cn(
          "w-full overflow-hidden rounded-full bg-elevated",
          sizes[size]
        )}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            colors[color]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-muted">{Math.round(percentage)}%</span>
      )}
    </div>
  );
}