import * as React from "react"
import { Image, Paperclip, Link as LinkIcon } from "lucide-react"
import { IconButton } from "../../atoms/IconButton"

export interface MediaAttachBarProps {
  onAttachImage?: () => void
  onAttachFile?: () => void
  onAttachLink?: () => void
  className?: string
}

const MediaAttachBar = React.forwardRef<HTMLDivElement, MediaAttachBarProps>(
  ({ onAttachImage, onAttachFile, onAttachLink, className }, ref) => {
    return (
      <div ref={ref} className={`flex items-center gap-1 ${className ?? ""}`}>
        <IconButton
          icon={Image}
          aria-label="이미지 첨부"
          variant="ghost"
          size="sm"
          onClick={onAttachImage}
        />
        <IconButton
          icon={Paperclip}
          aria-label="파일 첨부"
          variant="ghost"
          size="sm"
          onClick={onAttachFile}
        />
        <IconButton
          icon={LinkIcon}
          aria-label="링크 첨부"
          variant="ghost"
          size="sm"
          onClick={onAttachLink}
        />
      </div>
    )
  }
)
MediaAttachBar.displayName = "MediaAttachBar"

export { MediaAttachBar }
