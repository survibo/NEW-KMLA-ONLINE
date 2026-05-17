import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

const imageThumbVariants = cva("overflow-hidden rounded-lg bg-[var(--color-surface-subtle)]", {
  variants: {
    aspect: {
      square: "aspect-square",
      video: "aspect-video",
      portrait: "aspect-[3/4]",
      wide: "aspect-[16/9]",
      story: "aspect-[9/16]",
    },
    size: {
      sm: "w-16",
      md: "w-24",
      lg: "w-32",
      xl: "w-48",
      full: "w-full",
    },
    rounded: {
      none: "rounded-none",
      sm: "rounded-sm",
      default: "rounded-lg",
      lg: "rounded-xl",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    aspect: "square",
    rounded: "default",
  },
})

export interface ImageThumbProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof imageThumbVariants> {
  src?: string
  alt?: string
}

const ImageThumb = React.forwardRef<HTMLDivElement, ImageThumbProps>(
  ({ className, aspect, size, rounded, src, alt, ...props }, ref) => {
    const [isLoading, setIsLoading] = React.useState(true)
    const [hasError, setHasError] = React.useState(false)

    return (
      <div
        ref={ref}
        className={imageThumbVariants({ aspect, size, rounded, className })}
        {...props}
      >
        {src && !hasError ? (
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover transition-opacity duration-200"
            style={{ opacity: isLoading ? 0 : 1 }}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setHasError(true)
              setIsLoading(false)
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[var(--color-text-tertiary)]">
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </div>
        )}
      </div>
    )
  }
)
ImageThumb.displayName = "ImageThumb"

export { ImageThumb, imageThumbVariants }
