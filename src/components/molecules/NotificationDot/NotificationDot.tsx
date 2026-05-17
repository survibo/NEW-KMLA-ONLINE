import * as React from "react"
import { type LucideIcon } from "lucide-react"
import { Badge } from "../../atoms/Badge"
import type { BadgeProps } from "../../atoms/Badge"

export interface NotificationDotProps {
  icon: LucideIcon
  badge?: Omit<BadgeProps, "ref" | "children">
  showBadge?: boolean
  count?: number
  className?: string
}

const NotificationDot = React.forwardRef<HTMLDivElement, NotificationDotProps>(
  ({ icon: Icon, badge, showBadge = true, count, className }, ref) => {
    const { className: badgeClassName, ...badgeProps } = badge ?? {}

    return (
      <div ref={ref} className={`relative inline-flex h-5 w-5 ${className ?? ""}`}>
        <Icon className="h-5 w-5" />
        {showBadge &&
          (count !== undefined ? (
            <Badge
              variant="secondary"
              size="sm"
              count={count}
              {...badgeProps}
              className={`absolute top-0 right-0 z-10 translate-x-1/2 -translate-y-1/2 leading-none whitespace-nowrap tabular-nums ${badgeClassName ?? ""}`}
            />
          ) : (
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-[var(--color-notify-badge-bg)]" />
          ))}
      </div>
    )
  }
)
NotificationDot.displayName = "NotificationDot"

export { NotificationDot }
