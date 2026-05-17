import * as React from "react"
import { Avatar } from "../../atoms/Badge/Avatar"
import { Button } from "../../atoms/Button"
import { Divider } from "../../atoms/Divider"
import { Textarea } from "../../atoms/Textarea"
import { MediaAttachBar } from "../../molecules/MediaAttachBar"

export interface PostComposerAuthor {
  name: string
  avatarSrc?: string
  avatarFallback?: string
}

export interface PostComposerProps extends Omit<
  React.FormHTMLAttributes<HTMLFormElement>,
  "children" | "onChange" | "onSubmit"
> {
  author: PostComposerAuthor
  value?: string
  defaultValue?: string
  placeholder?: string
  submitLabel?: string
  disabled?: boolean
  isSubmitting?: boolean
  onValueChange?: (value: string) => void
  onSubmit?: (value: string) => void
  onAttachImage?: () => void
  onAttachFile?: () => void
  onAttachLink?: () => void
}

const PostComposer = React.forwardRef<HTMLFormElement, PostComposerProps>(
  (
    {
      author,
      value,
      defaultValue = "",
      placeholder = "내용을 입력하세요.",
      submitLabel = "게시",
      disabled,
      isSubmitting,
      onValueChange,
      onSubmit,
      onAttachImage,
      onAttachFile,
      onAttachLink,
      className,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
    const isControlled = value !== undefined
    const currentValue = isControlled ? value : uncontrolledValue
    const canSubmit = currentValue.trim().length > 0 && !disabled && !isSubmitting

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const nextValue = event.target.value

      if (!isControlled) {
        setUncontrolledValue(nextValue)
      }

      onValueChange?.(nextValue)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (!canSubmit) return

      onSubmit?.(currentValue)
    }

    return (
      <form
        ref={ref}
        className={`w-full overflow-hidden rounded-xl border border-[var(--color-border-default)] bg-[var(--color-surface-raised)] text-[var(--color-text-primary)] shadow-sm ${className ?? ""}`}
        onSubmit={handleSubmit}
        {...props}
      >
        <div className="flex gap-3 p-4 pb-3">
          <Avatar
            src={author.avatarSrc}
            alt={author.name}
            fallback={author.avatarFallback ?? author.name}
            size="md"
          />
          <div className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold">{author.name}</span>
            <Textarea
              value={currentValue}
              placeholder={placeholder}
              autoResize
              minRows={2}
              maxRows={4}
              disabled={disabled || isSubmitting}
              onChange={handleChange}
              className="mt-2 border-0 bg-transparent px-0 py-0 text-base focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>

        <Divider />

        <div className="flex flex-wrap items-center justify-between gap-2 p-2">
          <MediaAttachBar
            onAttachImage={onAttachImage}
            onAttachFile={onAttachFile}
            onAttachLink={onAttachLink}
          />
          <Button type="submit" size="sm" disabled={!canSubmit}>
            {isSubmitting ? "게시 중" : submitLabel}
          </Button>
        </div>
      </form>
    )
  }
)
PostComposer.displayName = "PostComposer"

export { PostComposer }
