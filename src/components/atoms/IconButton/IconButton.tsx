import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"
import { type LucideIcon } from "lucide-react"

const iconButtonVariants = cva(
  "inline-flex items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-action-default)] text-[var(--color-action-foreground)] hover:bg-[var(--color-action-hover)] active:bg-[var(--color-action-active)]",
        secondary:
          "border border-[var(--color-border-default)] bg-[var(--color-surface-raised)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface-subtle)] active:bg-[var(--color-border-default)]",
        ghost:
          "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-subtle)] hover:text-[var(--color-text-primary)] active:bg-[var(--color-border-default)]",
        danger:
          "text-[var(--color-status-error-text)] hover:bg-[var(--color-status-error-bg)] active:bg-[var(--color-status-error-border)]",
      },
      size: {
        xs: "h-6 w-6",
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "md",
    },
  }
)

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof iconButtonVariants> {
  asChild?: boolean
  icon: LucideIcon
  "aria-label": string
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, asChild = false, icon: Icon, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp className={iconButtonVariants({ variant, size, className })} ref={ref} {...props}>
        <Icon className="h-4 w-4" />
      </Comp>
    )
  }
)
IconButton.displayName = "IconButton"

export { IconButton, iconButtonVariants }
