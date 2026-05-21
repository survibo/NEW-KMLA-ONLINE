import {
  HomeIcon,
  MessageSquareIcon,
  MessagesSquareIcon,
  ShapesIcon,
  UserCircleIcon,
} from "lucide-react"
import { NavLink } from "react-router"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar"
import { cn } from "~/lib/utils"

const mainNavItems = [
  { to: "/", label: "Home", icon: HomeIcon, end: true },
  { to: "/groups", label: "Groups", icon: ShapesIcon },
  { to: "/community", label: "Community", icon: MessageSquareIcon },
  { to: "/messenger", label: "Messenger", icon: MessagesSquareIcon },
  { to: "/profile", label: "Profile", icon: UserCircleIcon },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="offcanvas" className="md:top-14 md:h-[calc(100svh-3.5rem)]">
      <SidebarHeader>
        <div className="flex flex-col gap-1 px-2 py-1">
          <p className="text-sm font-semibold">KMLA Online</p>
          <p className="text-muted-foreground text-xs">School community</p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.to}
                      end={item.end}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-2",
                          isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
                        )
                      }
                    >
                      <item.icon />
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
