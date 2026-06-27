import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "discount" | "new" | "organic" | "aussie" | "default";
  className?: string;
}

const variants = {
  discount: "bg-red-500 text-white",
  new: "bg-brand text-white",
  organic: "bg-lime-600 text-white",
  aussie: "bg-amber-500 text-white",
  default: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
