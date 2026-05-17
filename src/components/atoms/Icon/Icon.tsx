import * as React from "react"
import { type LucideIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

const iconVariants = cva("inline-flex items-center justify-center shrink-0", {
  variants: {
    size: {
      xs: "h-3 w-3",
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
      xl: "h-8 w-8",
    },
    iconColor: {
      default: "text-[var(--color-text-primary)]",
      secondary: "text-[var(--color-text-secondary)]",
      tertiary: "text-[var(--color-text-tertiary)]",
      primary: "text-[var(--color-primary-600)]",
      success: "text-[var(--color-status-success-text)]",
      warning: "text-[var(--color-status-warning-text)]",
      error: "text-[var(--color-status-error-text)]",
    },
  },
  defaultVariants: {
    size: "md",
    iconColor: "default",
  },
})

export interface IconProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof iconVariants> {
  icon: LucideIcon
  label?: string
}

const Icon = React.forwardRef<HTMLSpanElement, IconProps>(
  ({ className, icon: IconComponent, size, iconColor, label, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={iconVariants({ size, iconColor, className })}
        aria-hidden={!label}
        {...props}
      >
        <IconComponent />
        {label && <span className="sr-only">{label}</span>}
      </span>
    )
  }
)
Icon.displayName = "Icon"

export { Icon, iconVariants }
