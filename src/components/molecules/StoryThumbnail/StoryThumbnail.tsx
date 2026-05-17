import * as React from "react"
import { Plus } from "lucide-react"
import { Avatar } from "../../atoms/Badge/Avatar"
import type { AvatarProps } from "../../atoms/Badge/Avatar"

export interface StoryThumbnailProps {
  avatar?: Omit<AvatarProps, "ref">
  name: string
  isViewed?: boolean
  isAddButton?: boolean
  onClick?: () => void
  className?: string
}

const StoryThumbnail = React.forwardRef<HTMLButtonElement, StoryThumbnailProps>(
  ({ avatar, name, isViewed, isAddButton, onClick, className }, ref) => {
    const [isSeen, setIsSeen] = React.useState(isViewed)

    React.useEffect(() => {
      setIsSeen(isViewed)
    }, [isViewed])

    if (isAddButton) {
      return (
        <button
          ref={ref}
          type="button"
          onClick={onClick}
          className={`flex flex-col items-center gap-1.5 ${className ?? ""}`}
        >
          <div className="relative">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed border-[var(--color-border-default)] bg-[var(--color-surface-subtle)]">
              <Plus className="h-6 w-6 text-[var(--color-text-secondary)]" />
            </div>
          </div>
          <span className="max-w-[4rem] truncate text-xs text-[var(--color-text-secondary)]">
            스토리 추가
          </span>
        </button>
      )
    }

    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        className={`flex flex-col items-center gap-1.5 ${className ?? ""}`}
      >
        <div className="relative">
          <div
            className={`h-14 w-14 rounded-full p-0.5 ${isSeen ? "bg-[var(--color-border-default)]" : "bg-gradient-to-tr from-[var(--color-primary-500)] via-pink-500 to-orange-400"}`}
          >
            <div className="h-full w-full rounded-full bg-[var(--color-surface-raised)] p-0.5">
              {avatar ? (
                <Avatar {...avatar} fallback={name} size="lg" className="h-full w-full" />
              ) : (
                <Avatar fallback={name} size="lg" className="h-full w-full" />
              )}
            </div>
          </div>
        </div>
        <span className="max-w-[4rem] truncate text-xs text-[var(--color-text-secondary)]">
          {name}
        </span>
      </button>
    )
  }
)
StoryThumbnail.displayName = "StoryThumbnail"

export { StoryThumbnail }
