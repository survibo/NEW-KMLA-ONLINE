import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

const skeletonVariants = cva("animate-pulse rounded-md bg-[var(--color-surface-subtle)]", {
  variants: {
    variant: {
      default: "bg-[var(--color-surface-subtle)]",
      card: "bg-[var(--color-surface-subtle)] rounded-xl",
      avatar: "bg-[var(--color-surface-subtle)] rounded-full",
      text: "bg-[var(--color-surface-subtle)] rounded",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof skeletonVariants> {
  width?: string | number
  height?: string | number
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, width, height, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={skeletonVariants({ variant, className })}
        style={{
          width: width ?? undefined,
          height: height ?? undefined,
          ...style,
        }}
        {...props}
      />
    )
  }
)
Skeleton.displayName = "Skeleton"

export { Skeleton, skeletonVariants }
