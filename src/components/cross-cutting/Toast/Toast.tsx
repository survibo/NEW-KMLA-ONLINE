import * as React from "react"
import * as ToastPrimitive from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-lg border p-4 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default:
          "border-[var(--color-border-default)] bg-[var(--color-surface-raised)] text-[var(--color-text-primary)]",
        success:
          "border-[var(--color-status-success-border)] bg-[var(--color-status-success-bg)] text-[var(--color-status-success-text)]",
        warning:
          "border-[var(--color-status-warning-border)] bg-[var(--color-status-warning-bg)] text-[var(--color-status-warning-text)]",
        error:
          "border-[var(--color-status-error-border)] bg-[var(--color-status-error-bg)] text-[var(--color-status-error-text)]",
        info: "border-[var(--color-status-info-border)] bg-[var(--color-status-info-bg)] text-[var(--color-status-info-text)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface ToastProps
  extends
    React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>,
    VariantProps<typeof toastVariants> {}

const Toast = React.forwardRef<React.ElementRef<typeof ToastPrimitive.Root>, ToastProps>(
  ({ className, variant, children, ...props }, ref) => (
    <ToastPrimitive.Root ref={ref} className={toastVariants({ variant, className })} {...props}>
      {children}
    </ToastPrimitive.Root>
  )
)
Toast.displayName = ToastPrimitive.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>
>(({ className: _className, ...props }, ref) => (
  <ToastPrimitive.Action
    ref={ref}
    className="ring-offset-background inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-[var(--color-border-default)] bg-transparent px-3 text-sm font-medium transition-colors hover:bg-[var(--color-surface-subtle)] focus:ring-2 focus:ring-[var(--color-focus-ring)] focus:ring-offset-2 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
    {...props}
  />
))
ToastAction.displayName = ToastPrimitive.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>
>(({ className = "", ...props }, ref) => (
  <ToastPrimitive.Close
    ref={ref}
    className={`absolute top-2 right-2 rounded-md p-1 opacity-0 transition-opacity group-hover:opacity-100 hover:opacity-100 focus:opacity-100 focus:ring-2 focus:outline-none ${className}`}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitive.Close>
))
ToastClose.displayName = ToastPrimitive.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className = "", ...props }, ref) => (
  <ToastPrimitive.Title ref={ref} className={`text-sm font-semibold ${className}`} {...props} />
))
ToastTitle.displayName = ToastPrimitive.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className = "", ...props }, ref) => (
  <ToastPrimitive.Description ref={ref} className={`text-sm opacity-90 ${className}`} {...props} />
))
ToastDescription.displayName = ToastPrimitive.Description.displayName

const ToastIcon = ({
  variant,
}: {
  variant?: "default" | "success" | "warning" | "error" | "info"
}) => {
  switch (variant) {
    case "success":
      return <CheckCircle className="h-5 w-5 shrink-0" />
    case "warning":
      return <AlertTriangle className="h-5 w-5 shrink-0" />
    case "error":
      return <AlertCircle className="h-5 w-5 shrink-0" />
    case "info":
      return <Info className="h-5 w-5 shrink-0" />
    default:
      return null
  }
}

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  ToastIcon,
  toastVariants,
}

import { ToastProvider } from "./ToastProvider"
import { useToast } from "./useToast"

export { ToastProvider, useToast }
