import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"
import { cva } from "class-variance-authority"

const checkboxIndicatorVariants = cva(
  "flex h-full w-full items-center justify-center rounded-sm text-[var(--color-action-foreground)]"
)

export interface CheckboxProps extends React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
> {}

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <CheckboxPrimitive.Root
        ref={ref}
        className={`peer h-5 w-5 shrink-0 rounded border border-[var(--color-border-strong)] bg-[var(--color-surface-raised)] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-[var(--color-action-default)] data-[state=checked]:bg-[var(--color-action-default)] data-[state=indeterminate]:border-[var(--color-action-default)] data-[state=indeterminate]:bg-[var(--color-action-default)] ${className ?? ""}`}
        {...props}
      >
        <CheckboxPrimitive.Indicator className={checkboxIndicatorVariants()}>
          <Check className="h-3 w-3" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    )
  }
)
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
