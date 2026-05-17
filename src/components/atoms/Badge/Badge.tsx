import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-surface-subtle)] text-[var(--color-text-secondary)]",
        primary: "bg-[var(--color-action-default)] text-[var(--color-action-foreground)]",
        secondary: "bg-[var(--color-notify-badge-bg)] text-[var(--color-notify-badge-text)]",
        success: "bg-[var(--color-status-success-bg)] text-[var(--color-status-success-text)]",
        warning: "bg-[var(--color-status-warning-bg)] text-[var(--color-status-warning-text)]",
        error: "bg-[var(--color-status-error-bg)] text-[var(--color-status-error-text)]",
        dot: "bg-transparent p-0",
      },
      size: {
        sm: "h-4 min-w-4 px-1 text-xs",
        md: "h-5 min-w-5 px-1.5 text-xs",
        lg: "h-6 min-w-6 px-2 text-sm",
        dot: "h-2 w-2",
      },
    },
    compoundVariants: [
      { variant: "dot", size: "sm", className: "h-1.5 w-1.5" },
      { variant: "dot", size: "lg", className: "h-2.5 w-2.5" },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  count?: number
  maxCount?: number
  showZero?: boolean
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { className, variant, size, count, maxCount = 99, showZero = false, children, ...props },
    ref
  ) => {
    let content = children
    if (typeof count === "number") {
      if (count === 0 && !showZero) return null
      content = count > maxCount ? `${maxCount}+` : count
    }

    return (
      <span ref={ref} className={badgeVariants({ variant, size, className })} {...props}>
        {content}
      </span>
    )
  }
)
Badge.displayName = "Badge"

export { Badge, badgeVariants }
