import * as React from "react"
import { FileQuestion, Inbox, Search, Users, MessageSquare } from "lucide-react"
import { Button } from "../../atoms"

type EmptyStateVariant = "default" | "inbox" | "search" | "users" | "messages" | "posts"

interface EmptyStateProps {
  variant?: EmptyStateVariant
  title?: string
  description?: string
  icon?: React.ReactNode
  action?: {
    label?: string
    onClick?: () => void
  }
  className?: string
}

const variantConfig: Record<
  EmptyStateVariant,
  { icon: React.ReactNode; defaultTitle: string; defaultDescription: string }
> = {
  default: {
    icon: <FileQuestion className="h-12 w-12" />,
    defaultTitle: "No Data",
    defaultDescription: "There is no data to display.",
  },
  inbox: {
    icon: <Inbox className="h-12 w-12" />,
    defaultTitle: "Inbox Empty",
    defaultDescription: "You have no messages in your inbox.",
  },
  search: {
    icon: <Search className="h-12 w-12" />,
    defaultTitle: "No Results Found",
    defaultDescription: "Try adjusting your search or filters.",
  },
  users: {
    icon: <Users className="h-12 w-12" />,
    defaultTitle: "No Users",
    defaultDescription: "There are no users to display.",
  },
  messages: {
    icon: <MessageSquare className="h-12 w-12" />,
    defaultTitle: "No Messages",
    defaultDescription: "Start a conversation with someone.",
  },
  posts: {
    icon: <FileQuestion className="h-12 w-12" />,
    defaultTitle: "No Posts Yet",
    defaultDescription: "Be the first to create a post.",
  },
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  variant = "default",
  title,
  description,
  icon,
  action,
  className = "",
}) => {
  const config = variantConfig[variant]

  return (
    <div className={`flex flex-col items-center justify-center gap-4 p-8 text-center ${className}`}>
      <div className="text-[var(--color-text-tertiary)]">{icon || config.icon}</div>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
          {title || config.defaultTitle}
        </h3>
        <p className="max-w-sm text-[var(--color-text-secondary)]">
          {description || config.defaultDescription}
        </p>
      </div>
      {action?.label && (
        <Button variant="secondary" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  )
}

export type { EmptyStateProps }
