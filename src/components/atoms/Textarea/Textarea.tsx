import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

const textareaVariants = cva(
  "flex w-full resize-none rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-raised)] px-3 py-2 text-sm text-[var(--color-text-primary)] transition-colors placeholder:text-[var(--color-text-tertiary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-[var(--color-border-default)]",
        error:
          "border-[var(--color-status-error-text)] focus-visible:ring-[var(--color-status-error-text)]",
      },
      autoResize: {
        true: "min-h-0 overflow-y-hidden",
        false: "min-h-[80px]",
      },
    },
    defaultVariants: {
      variant: "default",
      autoResize: false,
    },
  }
)

export interface TextareaProps
  extends
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    Omit<VariantProps<typeof textareaVariants>, "autoResize"> {
  autoResize?: boolean
  minRows?: number
  maxRows?: number
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant,
      autoResize = false,
      minRows,
      maxRows = 4,
      onChange,
      rows,
      value,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)
    const resolvedMinRows = minRows ?? rows ?? 1

    React.useImperativeHandle(ref, () => textareaRef.current!, [])

    const resizeTextarea = React.useCallback(() => {
      const textarea = textareaRef.current
      if (!autoResize || !textarea) return

      const computedStyle = window.getComputedStyle(textarea)
      const fontSize = Number.parseFloat(computedStyle.fontSize)
      const lineHeight =
        Number.parseFloat(computedStyle.lineHeight) ||
        (Number.isNaN(fontSize) ? 20 : fontSize * 1.5)
      const paddingTop = Number.parseFloat(computedStyle.paddingTop) || 0
      const paddingBottom = Number.parseFloat(computedStyle.paddingBottom) || 0
      const borderTop = Number.parseFloat(computedStyle.borderTopWidth) || 0
      const borderBottom = Number.parseFloat(computedStyle.borderBottomWidth) || 0
      const verticalSpace = paddingTop + paddingBottom + borderTop + borderBottom
      const minimumHeight = lineHeight * resolvedMinRows + verticalSpace
      const maximumHeight = lineHeight * maxRows + verticalSpace

      textarea.style.height = "auto"
      const nextHeight = Math.min(
        Math.max(textarea.scrollHeight + borderTop + borderBottom, minimumHeight),
        maximumHeight
      )

      textarea.style.height = `${nextHeight}px`
      textarea.style.overflowY =
        textarea.scrollHeight + borderTop + borderBottom > maximumHeight ? "auto" : "hidden"
    }, [autoResize, maxRows, resolvedMinRows])

    React.useLayoutEffect(() => {
      resizeTextarea()
    }, [resizeTextarea, value, defaultValue])

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(event)
      resizeTextarea()
    }

    return (
      <textarea
        className={textareaVariants({ variant, autoResize, className })}
        ref={textareaRef}
        rows={autoResize ? resolvedMinRows : rows}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea, textareaVariants }
