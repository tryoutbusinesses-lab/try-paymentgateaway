"use client";

import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "processing" | "done";
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors",
        status === "processing"
          ? "bg-warning/20 text-warning-foreground"
          : "bg-success/20 text-success"
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          status === "processing" ? "bg-warning animate-pulse" : "bg-success"
        )}
      />
      {status === "processing" ? "Processing" : "Done"}
    </span>
  );
}
