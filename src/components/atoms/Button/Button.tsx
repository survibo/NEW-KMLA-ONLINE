import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

const buttonVariants = cva(
  "inline-flex select-none items-center justify-center gap-2 rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-action-default)] text-[var(--color-action-foreground)] hover:bg-[var(--color-action-hover)] active:bg-[var(--color-action-active)]",
        secondary:
          "border border-[var(--color-border-default)] bg-[var(--color-surface-raised)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface-subtle)] active:bg-[var(--color-border-default)]",
        ghost:
          "text-[var(--color-text-primary)] hover:bg-[var(--color-surface-subtle)] active:bg-[var(--color-border-default)]",
        danger: "bg-[var(--color-status-error-text)] text-white hover:bg-red-700 active:bg-red-800",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={buttonVariants({ variant, size, className })} ref={ref} {...props} />
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
