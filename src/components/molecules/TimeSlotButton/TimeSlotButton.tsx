import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Button } from "../../atoms/Button"

const timeSlotButtonVariants = cva("w-full", {
  variants: {
    status: {
      available: "border-[var(--color-status-success-border)] bg-[var(--color-status-success-bg)]",
      booked:
        "border-[var(--color-border-default)] bg-[var(--color-surface-subtle)] cursor-not-allowed",
      mine: "border-[var(--color-primary-500)] bg-[var(--color-primary-50)]",
    },
  },
  defaultVariants: {
    status: "available",
  },
})

export interface TimeSlotButtonProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick">,
    VariantProps<typeof timeSlotButtonVariants> {
  time: string
  onBook?: () => void
  onCancel?: () => void
}

const TimeSlotButton = React.forwardRef<HTMLButtonElement, TimeSlotButtonProps>(
  ({ time, status, onBook, onCancel, className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="ghost"
        className={`justify-center ${timeSlotButtonVariants({ status, className })}`}
        onClick={status === "mine" ? onCancel : status === "available" ? onBook : undefined}
        disabled={status === "booked"}
        {...props}
      >
        {time}
      </Button>
    )
  }
)
TimeSlotButton.displayName = "TimeSlotButton"

export { TimeSlotButton, timeSlotButtonVariants }
