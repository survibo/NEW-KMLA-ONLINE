import * as React from "react"
import { type LucideIcon } from "lucide-react"
import { IconButton } from "../../atoms/IconButton"

export interface ReactionItem {
  icon: LucideIcon
  label: string
  count?: number
  isActive?: boolean
  onClick?: () => void
}

export interface ReactionBarProps {
  reactions: ReactionItem[]
  className?: string
}

const ReactionBar = React.forwardRef<HTMLDivElement, ReactionBarProps>(
  ({ reactions, className }, ref) => {
    return (
      <div ref={ref} className={`flex items-center gap-1 ${className ?? ""}`}>
        {reactions.map((reaction) => (
          <React.Fragment key={reaction.label}>
            <IconButton
              icon={reaction.icon}
              aria-label={reaction.label}
              variant="ghost"
              size="sm"
              onClick={reaction.onClick}
              className={reaction.isActive ? "text-[var(--color-primary-600)]" : undefined}
            />
            {reaction.count !== undefined && reaction.count > 0 && (
              <span className="min-w-[1rem] text-xs text-[var(--color-text-secondary)]">
                {reaction.count}
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    )
  }
)
ReactionBar.displayName = "ReactionBar"

export { ReactionBar }
