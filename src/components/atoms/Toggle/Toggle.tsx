import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cva, type VariantProps } from "class-variance-authority"

const toggleVariants = cva(
  "inline-flex shrink-0 items-center rounded-full p-0.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-border-strong)] data-[state=checked]:bg-[var(--color-action-default)]",
        success: "bg-[var(--color-border-strong)] data-[state=checked]:bg-green-600",
        danger:
          "bg-[var(--color-border-strong)] data-[state=checked]:bg-[var(--color-status-error-text)]",
      },
      size: {
        sm: "h-5 w-9",
        md: "h-6 w-11",
        lg: "h-7 w-13",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

const toggleThumbVariants = cva(
  "block rounded-full bg-white shadow-sm ring-0 transition-transform",
  {
    variants: {
      size: {
        sm: "h-4 w-4 data-[state=checked]:translate-x-4",
        md: "h-5 w-5 data-[state=checked]:translate-x-5",
        lg: "h-6 w-6 data-[state=checked]:translate-x-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export interface ToggleProps
  extends
    React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    VariantProps<typeof toggleVariants> {}

const Toggle = React.forwardRef<React.ElementRef<typeof SwitchPrimitive.Root>, ToggleProps>(
  ({ className, size, variant, ...props }, ref) => (
    <SwitchPrimitive.Root
      className={toggleVariants({ size, variant, className })}
      ref={ref}
      {...props}
    >
      <SwitchPrimitive.Thumb className={toggleThumbVariants({ size })} />
    </SwitchPrimitive.Root>
  )
)
Toggle.displayName = SwitchPrimitive.Root.displayName

export { Toggle, toggleVariants, toggleThumbVariants }
