import { Outlet } from "react-router"

import { AppHeader } from "~/components/layout/app-header"
import { AppSidebar } from "~/components/layout/app-sidebar"
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar"

type AppShellProps = {
  email: string
}

export function AppShell({ email }: AppShellProps) {
  return (
    <SidebarProvider>
      <div className="flex h-svh w-full flex-1 flex-col overflow-hidden">
        <AppHeader email={email} />
        <div className="flex min-h-0 flex-1">
          <AppSidebar />
          <SidebarInset className="min-h-0">
            <div className="bg-muted/25 flex flex-1 flex-col overflow-y-auto p-4 sm:p-6">
              <Outlet />
            </div>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  )
}
