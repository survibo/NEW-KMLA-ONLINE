"use client"

import * as React from "react"
import { ToastProvider as RadixToastProvider, Viewport } from "@radix-ui/react-toast"
import { useToast } from "./useToast"
import { Toast, ToastClose, ToastDescription, ToastIcon, ToastTitle } from "./Toast"

export const ToastProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <RadixToastProvider swipeDirection="right">
      {children}
      <Viewport className="fixed inset-x-0 top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:top-auto sm:right-0 sm:bottom-0 sm:left-auto sm:max-w-[420px] sm:flex-col" />
    </RadixToastProvider>
  )
}

export { ToastProviderWrapper as ToastProvider }

export const Toaster = () => {
  const { toasts } = useToast()

  return (
    <ToastProviderWrapper>
      {toasts.map(({ id, title, description, action, variant, ...props }) => {
        const resolvedVariant = variant ?? "default"
        return (
          <Toast key={id} variant={resolvedVariant} {...props}>
            <div className="flex gap-3">
              <ToastIcon variant={resolvedVariant} />
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && <ToastDescription>{description}</ToastDescription>}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
    </ToastProviderWrapper>
  )
}
