import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

const spinnerVariants = cva("inline-flex shrink-0 animate-spin items-center justify-center", {
  variants: {
    size: {
      xs: "h-3 w-3",
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
      xl: "h-8 w-8",
    },
    spinnerColor: {
      default: "text-[var(--color-text-secondary)]",
      primary: "text-[var(--color-primary-600)]",
      secondary: "text-[var(--color-secondary-500)]",
      white: "text-white",
    },
  },
  defaultVariants: {
    size: "md",
    spinnerColor: "default",
  },
})

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof spinnerVariants> {
  label?: string
}

const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, size, spinnerColor, label = "Loading", ...props }, ref) => {
    return (
      <span
        ref={ref}
        role="status"
        className={spinnerVariants({ size, spinnerColor, className })}
        {...props}
      >
        <svg
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
        <span className="sr-only">{label}</span>
      </span>
    )
  }
)
Spinner.displayName = "Spinner"

export { Spinner, spinnerVariants }
