import {
  HomeIcon,
  MessageSquareIcon,
  MessagesSquareIcon,
  ShapesIcon,
  UserCircleIcon,
} from "lucide-react"
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

const mainNavItems = [
  { to: "/", label: "Home", icon: HomeIcon, end: true, isActive: false },
  { to: "/groups", label: "Groups", icon: ShapesIcon, isActive: false },
  { to: "/community", label: "Community", icon: MessageSquareIcon, isActive: false },
  { to: "/messenger", label: "Messenger", icon: MessagesSquareIcon, isActive: false },
  { to: "/profile", label: "Profile", icon: UserCircleIcon, isActive: false },
]

export function AppSidebar() {
  const location = useLocation()
  mainNavItems.forEach(
    (item) =>
      (item.isActive = item.end ? location.pathname === "/" : location.pathname.startsWith(item.to))
  )
  return (
    <Sidebar collapsible="offcanvas" className="md:top-14 md:h-[calc(100svh-3.5rem)]">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild isActive={item.isActive}>
                    <NavLink
                      to={item.to}
                      end={item.end}
                      className="text-sidebar-foreground flex items-center gap-2"
                    >
                      <item.icon strokeWidth={item.isActive ? 2.5 : 2} />
                      <span>{item.label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
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
