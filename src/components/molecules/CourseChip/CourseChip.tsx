import * as React from "react"
import { X, Clock } from "lucide-react"
import { IconButton } from "../../atoms/IconButton"

export interface CourseChipProps {
  name: string
  time?: string
  location?: string
  onRemove?: () => void
  className?: string
}

const CourseChip = React.forwardRef<HTMLDivElement, CourseChipProps>(
  ({ name, time, location, onRemove, className }, ref) => {
    return (
      <div
        ref={ref}
        className={`inline-flex items-center gap-2 rounded-lg border border-[var(--color-border-default)] bg-[var(--color-surface-raised)] px-3 py-2 ${className ?? ""}`}
      >
        <span className="text-sm font-medium text-[var(--color-text-primary)]">{name}</span>
        {(time || location) && (
          <div className="flex items-center gap-1 text-xs text-[var(--color-text-secondary)]">
            <Clock className="h-3 w-3" />
            <span>
              {time}
              {location && ` · ${location}`}
            </span>
          </div>
        )}
        {onRemove && (
          <IconButton icon={X} aria-label="삭제" variant="ghost" size="xs" onClick={onRemove} />
        )}
      </div>
    )
  }
)
CourseChip.displayName = "CourseChip"

export { CourseChip }
