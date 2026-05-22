import { NavLink, useLocation } from "react-router"

import { appNavItems, isAppNavItemActive } from "~/components/layout/app-nav-items"
import { cn } from "~/lib/utils"

export function MobileTabBar() {
  const location = useLocation()

  return (
    <nav
      aria-label="Primary navigation"
      className="bg-background/95 fixed inset-x-0 bottom-0 z-30 border-t backdrop-blur md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid h-16 grid-cols-5">
        {appNavItems.map((item) => {
          const isActive = isAppNavItemActive(location.pathname, item)

          return (
            <li key={item.to} className="min-w-0">
              <NavLink
                to={item.to}
                end={item.end}
                className={cn(
                  "text-muted-foreground flex h-full w-full flex-col items-center justify-center gap-1 px-1 text-[11px] font-medium",
                  isActive && "text-primary"
                )}
              >
                <item.icon className="size-4" strokeWidth={isActive ? 2.5 : 2} />
                <span className="truncate">{item.label}</span>
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
