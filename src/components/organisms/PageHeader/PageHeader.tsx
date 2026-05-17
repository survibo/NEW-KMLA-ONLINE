import * as React from "react"
import { Bell } from "lucide-react"
import { SearchBar } from "../../molecules/SearchBar"
import { IconButton } from "../../atoms/IconButton"
import { Avatar } from "../../atoms/Badge/Avatar"

export interface PageHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {}

const PageHeader = React.forwardRef<HTMLElement, PageHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={`sticky top-0 z-10 border-b border-[var(--color-border-default)] bg-[var(--color-surface-raised)] ${className ?? ""}`}
        {...props}
      >
        <div className="mx-auto flex h-14 items-center justify-between gap-4 px-5 lg:h-16 lg:gap-10 lg:px-7">
          <a href="#" className="text-lg font-semibold whitespace-nowrap">
            KMLA Online
          </a>
          <SearchBar
            placeholder="검색"
            className="hidden w-full max-w-[40rem] sm:flex"
            inputProps={{ "aria-label": "검색" }}
          />
          <div className="flex items-center gap-1">
            <IconButton icon={Bell} aria-label="알림 열기" size="sm" />
            <Avatar fallback="나" size="sm" />
          </div>
        </div>
      </header>
    )
  }
)
PageHeader.displayName = "PageHeader"

export { PageHeader }
