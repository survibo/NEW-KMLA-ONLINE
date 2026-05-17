import * as React from "react"
import { Avatar } from "../../atoms/Badge/Avatar"
import { Badge } from "../../atoms/Badge"
import { TimeBadge } from "../../atoms/TimeBadge"
import type { AvatarProps } from "../../atoms/Badge/Avatar"

export interface ChatRoomItemProps {
  avatar?: Omit<AvatarProps, "ref">
  name: string
  preview?: string
  time?: Date | string | number
  unreadCount?: number
  isOnline?: boolean
  onClick?: () => void
  className?: string
}

const ChatRoomItem = React.forwardRef<HTMLButtonElement, ChatRoomItemProps>(
  ({ avatar, name, preview, time, unreadCount, isOnline, onClick, className }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        className={`flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-[var(--color-surface-subtle)] ${className ?? ""}`}
      >
        <div className="relative shrink-0">
          <Avatar {...avatar} fallback={name} size="md" />
          {isOnline && (
            <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-[var(--color-surface-raised)] bg-green-500" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="truncate text-sm font-medium text-[var(--color-text-primary)]">
              {name}
            </span>
            {time && <TimeBadge date={time} size="xs" className="relative bottom-1.5 left-1" />}
          </div>
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-sm text-[var(--color-text-secondary)]">{preview}</p>
            {unreadCount !== undefined && unreadCount > 0 && (
              <Badge variant="primary" size="sm" count={unreadCount} />
            )}
          </div>
        </div>
      </button>
    )
  }
)
ChatRoomItem.displayName = "ChatRoomItem"

export { ChatRoomItem }
