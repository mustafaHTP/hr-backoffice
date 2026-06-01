import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AppCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "flat" | "outlined";
  clickable?: boolean;
}

// ? a bit useless because of shadcn, could be used if more customization is needed
export function AppCard({
  children,
  className,
  variant = "default",
  clickable = false,
}: AppCardProps) {
  const baseStyles =
    "rounded-lg border transition-all duration-200 bg-white dark:bg-slate-950";

  const variantStyles = {
    default: "border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md",
    elevated: "border-transparent shadow-md hover:shadow-lg",
    flat: "border-slate-200 dark:border-slate-800 shadow-none",
    outlined: "border-2 border-slate-300 dark:border-slate-700 shadow-none",
  };

  const hoverStyles = clickable
    ? "cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900"
    : "";

  return (
    <div
      className={cn(
        baseStyles,
        variantStyles[variant],
        hoverStyles,
        "p-4 sm:p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

AppCard.Header = function AppCardHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-b border-slate-200 dark:border-slate-800 pb-3 sm:pb-4 mb-3 sm:mb-4",
        className,
      )}
    >
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
        {children}
      </h3>
    </div>
  );
};

AppCard.Body = function AppCardBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("text-slate-700 dark:text-slate-300", className)}>
      {children}
    </div>
  );
};

AppCard.Footer = function AppCardFooter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-t border-slate-200 dark:border-slate-800 pt-3 sm:pt-4 mt-3 sm:mt-4 flex gap-2 justify-end",
        className,
      )}
    >
      {children}
    </div>
  );
};
