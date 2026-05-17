import * as React from "react"
import { Users } from "lucide-react"
import { ImageThumb } from "../../atoms/ImageThumb"
import { Tag } from "../../atoms/Tag"
import type { ImageThumbProps } from "../../atoms/ImageThumb"

export interface GroupCardProps {
  image?: Omit<ImageThumbProps, "ref">
  name: string
  description?: string
  category?: string
  memberCount?: number
  isPrivate?: boolean
  onClick?: () => void
  className?: string
}

const GroupCard = React.forwardRef<HTMLButtonElement, GroupCardProps>(
  ({ image, name, description, category, memberCount, isPrivate, onClick, className }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        className={`flex flex-col overflow-hidden rounded-xl border border-[var(--color-border-default)] bg-[var(--color-surface-raised)] transition-colors hover:bg-[var(--color-surface-subtle)] ${className ?? ""}`}
      >
        <ImageThumb {...image} aspect="wide" className="h-24 w-full" />
        <div className="flex flex-col gap-2 p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-1 font-semibold text-[var(--color-text-primary)]">{name}</h3>
            {isPrivate && (
              <Tag variant="outline" size="sm">
                비공개
              </Tag>
            )}
          </div>
          {description && (
            <p className="line-clamp-2 text-sm text-[var(--color-text-secondary)]">{description}</p>
          )}
          <div className="flex items-center justify-between">
            {category && (
              <Tag variant="primary" size="sm">
                {category}
              </Tag>
            )}
            {memberCount !== undefined && (
              <div className="flex items-center gap-1 text-xs text-[var(--color-text-tertiary)]">
                <Users className="h-3 w-3" />
                <span>{memberCount}명</span>
              </div>
            )}
          </div>
        </div>
      </button>
    )
  }
)
GroupCard.displayName = "GroupCard"

export { GroupCard }
