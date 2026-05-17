import * as React from "react"
import { Avatar } from "../../atoms/Badge/Avatar"
import { TimeBadge } from "../../atoms/TimeBadge"
import type { AvatarProps } from "../../atoms/Badge/Avatar"

export interface NotificationItemProps {
  avatar?: Omit<AvatarProps, "ref">
  title: string
  description?: string
  time?: Date | string | number
  isRead?: boolean
  onClick?: () => void
  onMarkAsRead?: () => void
  className?: string
}

const NotificationItem = React.forwardRef<HTMLButtonElement, NotificationItemProps>(
  ({ avatar, title, description, time, isRead, onClick, onMarkAsRead, className }, ref) => {
    const handleClick = () => {
      if (!isRead) {
        onMarkAsRead?.()
      }
      onClick?.()
    }

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        className={`flex w-full items-start gap-3 rounded-lg p-3 text-left transition-colors hover:bg-[var(--color-surface-subtle)] ${!isRead ? "bg-[var(--color-primary-50)]" : ""} ${className ?? ""}`}
      >
        <div className="relative shrink-0">
          <Avatar {...avatar} fallback="" size="md" />
          <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-[var(--color-notify-badge-bg)]" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p
              className={`text-sm ${!isRead ? "font-medium text-[var(--color-text-primary)]" : "text-[var(--color-text-secondary)]"}`}
            >
              {title}
            </p>
            {time && <TimeBadge date={time} size="xs" />}
          </div>
          {description && (
            <p className="mt-0.5 line-clamp-2 text-sm text-[var(--color-text-tertiary)]">
              {description}
            </p>
          )}
        </div>
      </button>
    )
  }
)
NotificationItem.displayName = "NotificationItem"

export { NotificationItem }
