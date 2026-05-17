import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cva, type VariantProps } from "class-variance-authority"

const avatarVariants = cva("relative flex shrink-0 overflow-hidden rounded-full", {
  variants: {
    size: {
      xs: "h-6 w-6",
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-12 w-12",
      xl: "h-16 w-16",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

const avatarImageVariants = cva("aspect-square h-full w-full object-cover")

const avatarFallbackVariants = cva(
  "flex h-full w-full items-center justify-center rounded-full bg-[var(--color-surface-subtle)] text-[var(--color-text-secondary)] font-medium",
  {
    variants: {
      size: {
        xs: "text-xs",
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
        xl: "text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export interface AvatarProps
  extends
    React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  src?: string
  alt?: string
  fallback?: string
}

const Avatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  ({ className, size, src, alt, fallback, ...props }, ref) => {
    const initials = React.useMemo(() => {
      if (!fallback) return "?"
      const words = fallback.trim().split(/\s+/)
      if (words.length === 1) return words[0].charAt(0).toUpperCase()
      return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase()
    }, [fallback])

    return (
      <AvatarPrimitive.Root ref={ref} className={avatarVariants({ size, className })} {...props}>
        <AvatarPrimitive.Image className={avatarImageVariants()} src={src} alt={alt} />
        <AvatarPrimitive.Fallback className={avatarFallbackVariants({ size })} delayMs={600}>
          {initials}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>
    )
  }
)
Avatar.displayName = AvatarPrimitive.Root.displayName

export { Avatar, avatarVariants }
