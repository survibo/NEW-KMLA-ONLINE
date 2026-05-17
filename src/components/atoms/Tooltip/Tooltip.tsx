import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cva, type VariantProps } from "class-variance-authority"

const tooltipContentVariants = cva(
  "z-50 overflow-hidden rounded-md bg-[var(--color-surface-overlay)] px-3 py-1.5 text-sm text-[var(--color-text-primary)] shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
  {
    variants: {
      size: {
        sm: "text-xs px-2 py-1",
        md: "text-sm px-3 py-1.5",
        lg: "text-base px-4 py-2",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

const tooltipArrowVariants = cva("fill-[var(--color-surface-overlay)]")

export interface TooltipProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>, "disableHoverableContent">,
    VariantProps<typeof tooltipContentVariants> {
  content: React.ReactNode
  children: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  delayDuration?: number
}

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = ({
  children,
  content,
  size,
  side = "top",
  align = "center",
  delayDuration = 300,
  ...props
}: TooltipProps) => (
  <TooltipPrimitive.Root delayDuration={delayDuration} {...props}>
    <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        side={side}
        align={align}
        className={tooltipContentVariants({ size })}
        sideOffset={4}
      >
        {content}
        <TooltipPrimitive.Arrow className={tooltipArrowVariants()} />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  </TooltipPrimitive.Root>
)

export { Tooltip, TooltipProvider, tooltipContentVariants }
