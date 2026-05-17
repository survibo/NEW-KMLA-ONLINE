import * as React from "react"
import { Home, Menu, Send, Settings, Users } from "lucide-react"
import { IconButton } from "../../atoms/IconButton"
import { SectionNav } from "../../molecules/SectionNav"

type PrimaryNavigationKey = "home" | "group" | "message" | "setting"

export interface PrimaryNavigationProps {
  activeKey: PrimaryNavigationKey
  className?: string
  collapsed?: boolean
  defaultCollapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
}

const navigationItems = [
  { key: "home", label: "Home", href: "#", icon: Home },
  { key: "group", label: "Group", href: "#", icon: Users },
  { key: "message", label: "Message", href: "#", icon: Send },
  { key: "setting", label: "Setting", href: "#", icon: Settings },
] as const

const PrimaryNavigation = ({
  activeKey,
  className,
  collapsed,
  defaultCollapsed = true,
  onCollapsedChange,
}: PrimaryNavigationProps) => {
  const [uncontrolledCollapsed, setUncontrolledCollapsed] = React.useState(defaultCollapsed)

  const isCollapsed = collapsed ?? uncontrolledCollapsed

  const handleCollapsedChange = React.useCallback(
    (nextCollapsed: boolean) => {
      if (collapsed === undefined) {
        setUncontrolledCollapsed(nextCollapsed)
      }

      onCollapsedChange?.(nextCollapsed)
    },
    [collapsed, onCollapsedChange]
  )

  const items = React.useMemo(
    () =>
      navigationItems.map((item) => ({
        ...item,
        isActive: item.key === activeKey,
      })),
    [activeKey]
  )

  return (
    <>
      <aside className={`hidden lg:block ${className ?? ""}`.trim()}>
        <div
          className={`sticky top-24 space-y-4 transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isCollapsed ? "w-16" : "w-52"
          }`}
        >
          <IconButton
            icon={Menu}
            aria-label={isCollapsed ? "Expand navigation" : "Collapse navigation"}
            size="sm"
            onClick={() => handleCollapsedChange(!isCollapsed)}
            className="relative left-1"
          />
          <SectionNav
            ariaLabel="Primary"
            collapsed={isCollapsed}
            items={items}
            orientation="vertical"
          />
        </div>
      </aside>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-border-default)] bg-[var(--color-surface-raised)] px-3 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(17,24,39,0.08)] lg:hidden">
        <SectionNav
          ariaLabel="Primary"
          collapsed={true}
          items={items}
          orientation="horizontal"
          className="justify-between gap-0 overflow-x-visible"
        />
      </div>
    </>
  )
}

PrimaryNavigation.displayName = "PrimaryNavigation"

export { PrimaryNavigation }
export type { PrimaryNavigationKey }
