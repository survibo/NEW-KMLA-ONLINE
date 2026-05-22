import { NavLink, useLocation } from "react-router"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar"
import { appNavItems, isAppNavItemActive } from "~/components/layout/app-nav-items"

export function AppSidebar() {
  const location = useLocation()

  return (
    <Sidebar collapsible="offcanvas" className="md:top-14 md:h-[calc(100svh-3.5rem)]">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {appNavItems.map((item) => {
                const isActive = isAppNavItemActive(location.pathname, item)

                return (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <NavLink
                        to={item.to}
                        end={item.end}
                        className="text-sidebar-foreground flex items-center gap-2"
                      >
                        <item.icon strokeWidth={isActive ? 2.5 : 2} />
                        <span>{item.label}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <p className="text-muted-foreground px-2 py-1 text-xs">Official and community spaces</p>
      </SidebarFooter>
    </Sidebar>
  )
}
