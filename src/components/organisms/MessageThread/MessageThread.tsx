import * as React from "react"
import { MessageBubble } from "../../molecules"
import type {
  MessageBubbleFile,
  MessageBubbleGroupPosition,
  MessageBubbleReplyTo,
} from "../../molecules"
import type { AvatarProps } from "../../atoms/Badge/Avatar"

interface MessageThreadSender {
  id: string
  name: string
  avatar?: Omit<AvatarProps, "ref">
}

export interface MessageThreadMessage {
  id: string
  sender: MessageThreadSender
  content?: string
  image?: string
  file?: MessageBubbleFile
  replyTo?: MessageBubbleReplyTo
  time?: Date | string | number
  timeFormat?: "relative" | "absolute"
  metaLabel?: string
  isEdited?: boolean
  isDeleted?: boolean
}

export interface MessageThreadProps {
  messages: MessageThreadMessage[]
  currentUserId: string
  className?: string
}

const getGroupPosition = (
  previousMessage: MessageThreadMessage | undefined,
  currentMessage: MessageThreadMessage,
  nextMessage: MessageThreadMessage | undefined
): MessageBubbleGroupPosition => {
  const hasPreviousFromSameSender = previousMessage?.sender.id === currentMessage.sender.id
  const hasNextFromSameSender = nextMessage?.sender.id === currentMessage.sender.id

  if (hasPreviousFromSameSender && hasNextFromSameSender) {
    return "middle"
  }

  if (!hasPreviousFromSameSender && hasNextFromSameSender) {
    return "start"
  }

  if (hasPreviousFromSameSender && !hasNextFromSameSender) {
    return "end"
  }

  return "single"
}

const MessageThread = React.forwardRef<HTMLDivElement, MessageThreadProps>(
  ({ messages, currentUserId, className }, ref) => {
    return (
      <div ref={ref} className={`flex flex-col gap-1 ${className ?? ""}`.trim()}>
        {messages.map((message, index) => {
          const previousMessage = messages[index - 1]
          const nextMessage = messages[index + 1]
          const groupPosition = getGroupPosition(previousMessage, message, nextMessage)
          const isOwn = message.sender.id === currentUserId
          const showAvatar = !isOwn && ["single", "end"].includes(groupPosition)
          const showName = !isOwn && ["single", "start"].includes(groupPosition)
          const showTime = ["single", "end"].includes(groupPosition)
          const metaLabel =
            isOwn && ["single", "end"].includes(groupPosition) ? message.metaLabel : undefined

          return (
            <MessageBubble
              key={message.id}
              avatar={message.sender.avatar}
              name={message.sender.name}
              content={message.content}
              image={message.image}
              file={message.file}
              replyTo={message.replyTo}
              time={message.time}
              timeFormat={message.timeFormat}
              metaLabel={metaLabel}
              isEdited={message.isEdited}
              isDeleted={message.isDeleted}
              isOwn={isOwn}
              groupPosition={groupPosition}
              showAvatar={showAvatar}
              showName={showName}
              showTime={showTime}
            />
          )
        })}
      </div>
    )
  }
)

MessageThread.displayName = "MessageThread"

export { MessageThread }
