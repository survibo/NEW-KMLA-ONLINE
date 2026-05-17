import * as React from "react"
import { Clock, AlertCircle } from "lucide-react"
import { Icon } from "../../atoms/Icon"
import { Spinner } from "../../atoms/Spinner"

export interface ApprovalStatusBannerProps {
  status: "pending" | "approved" | "rejected"
  message?: string
  className?: string
}

const ApprovalStatusBanner = React.forwardRef<HTMLDivElement, ApprovalStatusBannerProps>(
  ({ status, message, className }, ref) => {
    const content = {
      pending: {
        icon: "spinner" as const,
        text: message || "관리자 승인 대기 중입니다...",
        className:
          "bg-[var(--color-status-info-bg)] border-[var(--color-status-info-border)] text-[var(--color-status-info-text)]",
      },
      approved: {
        icon: Clock,
        text: message || "승인이 완료되었습니다!",
        className:
          "bg-[var(--color-status-success-bg)] border-[var(--color-status-success-border)] text-[var(--color-status-success-text)]",
      },
      rejected: {
        icon: AlertCircle,
        text: message || "승인이 거절되었습니다.",
        className:
          "bg-[var(--color-status-error-bg)] border-[var(--color-status-error-border)] text-[var(--color-status-error-text)]",
      },
    }

    const { icon, text, className: bannerClass } = content[status]

    return (
      <div
        ref={ref}
        className={`flex items-center gap-3 rounded-lg border px-4 py-3 ${bannerClass} ${className ?? ""}`}
      >
        {icon === "spinner" ? (
          <Spinner size="sm" spinnerColor="primary" />
        ) : (
          <Icon icon={icon} size="sm" />
        )}
        <p className="text-sm font-medium">{text}</p>
      </div>
    )
  }
)
ApprovalStatusBanner.displayName = "ApprovalStatusBanner"

export { ApprovalStatusBanner }
