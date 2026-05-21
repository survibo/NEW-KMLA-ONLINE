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
    <header className="bg-background/95 sticky top-0 z-10 grid h-14 grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)] items-center gap-3 border-b px-3 backdrop-blur sm:px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <p className="text-sm font-semibold tracking-wide">KMLA</p>
      </div>
      <div className="relative mx-auto w-full max-w-xl">
        <SearchIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2" />
        <Input className="h-9 pl-9" placeholder="Search groups, posts, and people" />
      </div>
      <div className="ml-auto flex items-center gap-2 justify-self-end">
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
