import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

const tagVariants = cva("inline-flex items-center gap-1 rounded-full transition-colors", {
  variants: {
    variant: {
      default: "bg-[var(--color-surface-subtle)] text-[var(--color-text-secondary)]",
      primary: "bg-[var(--color-primary-100)] text-[var(--color-primary-700)]",
      success: "bg-[var(--color-status-success-bg)] text-[var(--color-status-success-text)]",
      warning: "bg-[var(--color-status-warning-bg)] text-[var(--color-status-warning-text)]",
      error: "bg-[var(--color-status-error-bg)] text-[var(--color-status-error-text)]",
      outline: "border border-[var(--color-border-default)] text-[var(--color-text-secondary)]",
    },
    size: {
      sm: "h-6 px-2 text-xs",
      md: "h-7 px-2.5 text-sm",
      lg: "h-8 px-3 text-sm",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
})

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof tagVariants> {}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant, size, ...props }, ref) => {
    return <span ref={ref} className={tagVariants({ variant, size, className })} {...props} />
  }
)
Tag.displayName = "Tag"

export { Tag, tagVariants }
