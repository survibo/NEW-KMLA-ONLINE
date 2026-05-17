import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

const inputVariants = cva(
  "flex w-full rounded-lg border bg-[var(--color-surface-raised)] text-[var(--color-text-primary)] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--color-text-tertiary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-[var(--color-border-default)]",
        error:
          "border-[var(--color-status-error-text)] focus-visible:ring-[var(--color-status-error-text)]",
      },
      inputSize: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-3 text-sm",
        lg: "h-12 px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "md",
    },
  }
)

export interface InputProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  inputSize?: "sm" | "md" | "lg"
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={inputVariants({ variant, inputSize, className })}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

const inputWrapperVariants = cva("flex flex-col gap-1.5")

export interface InputWrapperProps extends React.HTMLAttributes<HTMLDivElement> {}

const InputWrapper = React.forwardRef<HTMLDivElement, InputWrapperProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={inputWrapperVariants({ className })} {...props} />
  }
)
InputWrapper.displayName = "InputWrapper"

const inputLabelVariants = cva("text-sm font-medium text-[var(--color-text-primary)]")

export interface InputLabelProps extends React.ComponentPropsWithoutRef<
  typeof LabelPrimitive.Root
> {}

const InputLabel = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, InputLabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <LabelPrimitive.Root ref={ref} className={inputLabelVariants({ className })} {...props} />
    )
  }
)
InputLabel.displayName = "InputLabel"

const inputErrorVariants = cva("text-sm text-[var(--color-status-error-text)]")

export interface InputErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const InputError = React.forwardRef<HTMLParagraphElement, InputErrorProps>(
  ({ className, ...props }, ref) => {
    return <p ref={ref} className={inputErrorVariants({ className })} {...props} />
  }
)
InputError.displayName = "InputError"

export { Input, InputWrapper, InputLabel, InputError, inputVariants }
