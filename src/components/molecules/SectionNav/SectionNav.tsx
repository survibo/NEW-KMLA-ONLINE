import * as React from "react"
import type { LucideIcon } from "lucide-react"
import { Link } from "../../atoms/Link"

export interface SectionNavItem {
  label: string
  href?: string
  icon?: LucideIcon
  isActive?: boolean
  onClick?: () => void
}

export interface SectionNavProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  items: SectionNavItem[]
  ariaLabel?: string
  collapsed?: boolean
  orientation?: "horizontal" | "vertical"
}

const getRootClassName = (orientation: NonNullable<SectionNavProps["orientation"]>) =>
  orientation === "vertical" ? "flex flex-col gap-1" : "flex gap-1 overflow-x-auto"

const getItemClassName = (
  orientation: NonNullable<SectionNavProps["orientation"]>,
  isActive?: boolean,
  collapsed?: boolean
) => {
  const base =
    "inline-flex shrink-0 items-center gap-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"

  if (orientation === "vertical") {
    return `${base} h-9 overflow-hidden rounded-md border-l-2 px-3 ${
      collapsed ? "w-10 justify-start" : "w-full"
    } ${
      isActive
        ? "border-[var(--color-action-default)] bg-[var(--color-surface-subtle)] text-[var(--color-text-primary)]"
        : "border-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-subtle)] hover:text-[var(--color-text-primary)]"
    }`
  }

  return `${base} ${collapsed ? "h-9 flex-1 justify-center px-2" : "h-10 px-3"} border-b-2 ${
    isActive
      ? "border-[var(--color-action-default)] text-[var(--color-text-primary)]"
      : "border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
  }`
}

const SectionNav = React.forwardRef<HTMLElement, SectionNavProps>(
  (
    { items, ariaLabel, collapsed = false, orientation = "horizontal", className, ...props },
    ref
  ) => {
    return (
      <nav
        ref={ref}
        {...(ariaLabel ? { "aria-label": ariaLabel } : {})}
        className={`${getRootClassName(orientation)} ${className ?? ""}`}
        {...props}
      >
        {items.map((item) => {
          const Icon = item.icon
          const isAnimatedVerticalLabel = orientation === "vertical"
          const content = (
            <>
              {Icon && <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />}
              {isAnimatedVerticalLabel ? (
                <span
                  className={`overflow-hidden whitespace-nowrap transition-[max-width,opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    collapsed
                      ? "max-w-0 -translate-x-1 opacity-0"
                      : "max-w-32 translate-x-0 opacity-100"
                  }`}
                >
                  {item.label}
                </span>
              ) : (
                !collapsed && <span>{item.label}</span>
              )}
            </>
          )

          return item.href ? (
            <Link
              key={item.label}
              href={item.href}
              aria-label={collapsed ? item.label : undefined}
              underline="none"
              className={getItemClassName(orientation, item.isActive, collapsed)}
            >
              {content}
            </Link>
          ) : (
            <button
              key={item.label}
              type="button"
              aria-label={collapsed ? item.label : undefined}
              className={getItemClassName(orientation, item.isActive, collapsed)}
              onClick={item.onClick}
            >
              {content}
            </button>
          )
        })}
      </nav>
    )
  }
)
SectionNav.displayName = "SectionNav"

export { SectionNav }
