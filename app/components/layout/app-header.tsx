import { BellIcon, SearchIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { SidebarTrigger } from "~/components/ui/sidebar"

type AppHeaderProps = {
  email: string
}

function getInitials(email: string) {
  const base = email.split("@")[0] ?? "User"
  return base.slice(0, 2).toUpperCase()
}

export function AppHeader({ email }: AppHeaderProps) {
  return (
    <header className="bg-background/95 sticky top-0 z-10 flex h-14 items-center gap-2 border-b px-3 backdrop-blur sm:px-4">
      <SidebarTrigger className="md:hidden" />
      <div className="relative w-full max-w-md">
        <SearchIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2" />
        <Input className="pl-8" placeholder="Search groups, posts, and people" />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <BellIcon />
        </Button>
        <Avatar className="size-8">
          <AvatarFallback>{getInitials(email)}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
