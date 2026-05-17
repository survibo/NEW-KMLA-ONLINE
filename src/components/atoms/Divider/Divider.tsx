import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { cva, type VariantProps } from "class-variance-authority"

const dividerVariants = cva("shrink-0", {
  variants: {
    dividerOrientation: {
      horizontal: "h-px w-full",
      vertical: "h-full w-px",
    },
    variant: {
      default: "bg-[var(--color-border-default)]",
      strong: "bg-[var(--color-border-strong)]",
      subtle: "bg-[color-mix(in_srgb,var(--color-border-default)_70%,var(--color-surface-subtle))]",
    },
  },
  defaultVariants: {
    dividerOrientation: "horizontal",
    variant: "default",
  },
})

export interface DividerProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>, "orientation">,
    VariantProps<typeof dividerVariants> {
  decorative?: boolean
  orientation?: "horizontal" | "vertical"
}

const Divider = React.forwardRef<React.ElementRef<typeof SeparatorPrimitive.Root>, DividerProps>(
  ({ className, orientation = "horizontal", variant, decorative = true, ...props }, ref) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={dividerVariants({
        dividerOrientation: orientation,
        variant,
        className,
      })}
      {...props}
    />
  )
)
Divider.displayName = SeparatorPrimitive.Root.displayName

export { Divider, dividerVariants }
