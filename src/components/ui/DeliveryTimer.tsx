"use client";

import { useEffect, useState } from "react";
import { Clock, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface DeliveryTimerProps {
  minutes?: number;
  className?: string;
  variant?: "default" | "compact";
}

export function DeliveryTimer({ minutes = 15, className, variant = "default" }: DeliveryTimerProps) {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  if (variant === "compact") {
    return (
      <span className={cn("inline-flex items-center gap-1 text-xs font-medium text-brand", className)}>
        <Zap className="h-3 w-3" />
        {mins} min
      </span>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-brand-light px-3 py-1.5 text-sm font-medium text-brand-dark dark:bg-brand/20 dark:text-brand",
        className
      )}
    >
      <Clock className="h-4 w-4" />
      <span>
        Delivery in{" "}
        <strong>
          {mins}:{secs.toString().padStart(2, "0")}
        </strong>
      </span>
    </div>
  );
}
