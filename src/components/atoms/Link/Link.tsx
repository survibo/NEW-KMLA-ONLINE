import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

const linkVariants = cva(
  "inline-flex items-center gap-1 font-medium underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "text-[var(--color-text-link)] hover:text-[var(--color-text-link-hover)]",
        primary: "text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)]",
        secondary: "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
        danger: "text-[var(--color-status-error-text)] hover:text-red-700",
      },
      underline: {
        always: "underline",
        hover: "hover:underline",
        none: "no-underline",
      },
    },
    defaultVariants: {
      variant: "default",
      underline: "hover",
    },
  }
)

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof linkVariants> {
  external?: boolean
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, underline, external, ...props }, ref) => {
    const isExternal = external ?? props.href?.startsWith("http")
    return (
      <a
        ref={ref}
        className={linkVariants({ variant, underline, className })}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        {...props}
      />
    )
  }
)
Link.displayName = "Link"

export { Link, linkVariants }
