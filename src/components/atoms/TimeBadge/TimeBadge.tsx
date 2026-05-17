import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

const timeBadgeVariants = cva("inline-flex items-center text-[var(--color-text-tertiary)]", {
  variants: {
    size: {
      xs: "text-[10px]",
      sm: "text-xs",
      md: "text-sm",
    },
    format: {
      relative: "",
      absolute: "",
    },
  },
  defaultVariants: {
    size: "sm",
  },
})

export interface TimeBadgeProps
  extends React.HTMLAttributes<HTMLTimeElement>, VariantProps<typeof timeBadgeVariants> {
  date: Date | string | number
  format?: "relative" | "absolute"
}

const formatRelativeTime = (date: Date): string => {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSecs = Math.floor(diffMs / 1000)
  const diffMins = Math.floor(diffSecs / 60)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)
  const diffWeeks = Math.floor(diffDays / 7)
  const diffMonths = Math.floor(diffDays / 30)

  if (diffSecs < 60) return "방금"
  if (diffMins < 60) return `${diffMins}분 전`
  if (diffHours < 24) return `${diffHours}시간 전`
  if (diffDays < 7) return `${diffDays}일 전`
  if (diffWeeks < 4) return `${diffWeeks}주 전`
  if (diffMonths < 12) return `${diffMonths}개월 전`
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

const formatAbsoluteTime = (date: Date): string => {
  const now = new Date()
  const isToday = date.toDateString() === now.toDateString()
  const isYesterday = new Date(now.getTime() - 86400000).toDateString() === date.toDateString()

  if (isToday) {
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }
  if (isYesterday) {
    return "어제"
  }
  return date.toLocaleDateString("ko-KR", { month: "short", day: "numeric" })
}

const TimeBadge = React.forwardRef<HTMLTimeElement, TimeBadgeProps>(
  ({ className, size, format = "relative", date, ...props }, ref) => {
    const dateObj = React.useMemo(() => new Date(date), [date])
    const displayTime =
      format === "relative" ? formatRelativeTime(dateObj) : formatAbsoluteTime(dateObj)

    return (
      <time
        ref={ref}
        dateTime={dateObj.toISOString()}
        className={timeBadgeVariants({ size, format, className })}
        {...props}
      >
        {displayTime}
      </time>
    )
  }
)
TimeBadge.displayName = "TimeBadge"

export { TimeBadge, timeBadgeVariants }
