import * as React from "react"
import { Paperclip, X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

const fileChipVariants = cva(
  "inline-flex items-center gap-2 rounded-lg border bg-[var(--color-surface-raised)] px-3 py-2 transition-colors",
  {
    variants: {
      variant: {
        default: "border-[var(--color-border-default)]",
        selected: "border-[var(--color-primary-500)] bg-[var(--color-primary-50)]",
        error: "border-[var(--color-status-error-text)] bg-[var(--color-status-error-bg)]",
      },
      size: {
        sm: "h-7 text-xs",
        md: "h-8 text-sm",
        lg: "h-10 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface FileChipProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof fileChipVariants> {
  fileName: string
  fileSize?: number
  onRemove?: () => void
}

const formatFileSize = (bytes?: number): string => {
  if (!bytes) return ""
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${Math.round(bytes / (1024 * 1024))} MB`
}

const FileChip = React.forwardRef<HTMLDivElement, FileChipProps>(
  ({ className, variant, size, fileName, fileSize, onRemove, ...props }, ref) => {
    const extension = fileName.split(".").pop()?.toLowerCase() || ""
    const isImage = ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension)

    return (
      <div ref={ref} className={fileChipVariants({ variant, size, className })} {...props}>
        {isImage ? (
          <img
            src={`file:///${fileName}`}
            alt={fileName}
            className="h-5 w-5 rounded object-cover"
          />
        ) : (
          <Paperclip className="h-4 w-4 shrink-0 text-[var(--color-text-secondary)]" />
        )}
        <span className="min-w-0 flex-1 truncate text-[var(--color-text-primary)]">{fileName}</span>
        {fileSize !== undefined && (
          <span className="shrink-0 whitespace-nowrap text-[var(--color-text-tertiary)]">
            {formatFileSize(fileSize)}
          </span>
        )}
        {onRemove && (
          <button
            type="button"
            aria-label={`${fileName} 제거`}
            onClick={onRemove}
            className="ml-1 rounded p-0.5 hover:bg-[var(--color-surface-subtle)]"
          >
            <X className="h-3 w-3 text-[var(--color-text-secondary)]" />
          </button>
        )}
      </div>
    )
  }
)
FileChip.displayName = "FileChip"

export { FileChip, fileChipVariants }
