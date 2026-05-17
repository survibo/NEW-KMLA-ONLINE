import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"

import { cva, type VariantProps } from "class-variance-authority"

const dropdownContentVariants = cva(
  "z-50 min-w-[8rem] overflow-hidden rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-overlay)] p-1 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

const dropdownItemVariants = cva(
  "relative flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1.5 outline-none transition-colors focus:bg-[var(--color-surface-subtle)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  {
    variants: {
      size: {
        sm: "text-xs gap-1.5 px-1.5 py-1",
        md: "text-sm gap-2 px-2 py-1.5",
      },
      variant: {
        default: "",
        danger: "text-[var(--color-status-error-text)] focus:bg-[var(--color-status-error-bg)]",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
)

export interface DropdownMenuProps {
  trigger: React.ReactNode
  children: React.ReactNode
  align?: "start" | "center" | "end"
  sideOffset?: number
}

const DropdownMenu = ({ trigger, children, align = "end", sideOffset = 4 }: DropdownMenuProps) => (
  <DropdownMenuPrimitive.Root>
    <DropdownMenuPrimitive.Trigger asChild>{trigger}</DropdownMenuPrimitive.Trigger>
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        align={align}
        sideOffset={sideOffset}
        className={dropdownContentVariants()}
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  </DropdownMenuPrimitive.Root>
)

export interface DropdownMenuItemProps
  extends
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>,
    VariantProps<typeof dropdownItemVariants> {
  inset?: boolean
  disabled?: boolean
}

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  DropdownMenuItemProps
>(({ className, size, variant, inset, disabled, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    disabled={disabled}
    className={dropdownItemVariants({
      size,
      variant,
      className: inset ? "pl-8" : className,
    })}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

export interface DropdownMenuSeparatorProps extends React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Separator
> {}

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  DropdownMenuSeparatorProps
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={`-mx-1 my-1 h-px bg-[var(--color-border-default)] ${className ?? ""}`}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

export {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  dropdownContentVariants,
  dropdownItemVariants,
}
