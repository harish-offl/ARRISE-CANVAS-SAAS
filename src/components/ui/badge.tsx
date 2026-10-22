import * as React from "react";
import { cn } from "../../lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "orange" | "success" | "warning" | "error" | "muted";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  ...props
}: BadgeProps) {
  const variants = {
    default: "bg-elevated text-foreground",
    orange: "bg-orange/15 text-orange",
    success: "bg-success/15 text-success",
    warning: "bg-warning/15 text-warning",
    error: "bg-error/15 text-error",
    muted: "bg-elevated text-muted",
  };
  const sizes = {
    sm: "px-1.5 py-0.5 text-xs",
    md: "px-2.5 py-0.5 text-xs",
  };
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}

interface StatusDotProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: "online" | "offline" | "busy" | "away";
}

export function StatusDot({ status, className, ...props }: StatusDotProps) {
  const colors = {
    online: "bg-success",
    offline: "bg-muted",
    busy: "bg-error",
    away: "bg-warning",
  };
  return (
    <span
      className={cn(
        "inline-block h-2 w-2 rounded-full",
        colors[status],
        className
      )}
      {...props}
    />
  );
}