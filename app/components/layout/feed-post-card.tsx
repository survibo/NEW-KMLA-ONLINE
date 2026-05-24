import { PostActionBar } from "~/components/post-action-bar"
import { Badge } from "~/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"

export type FeedPostCardProps = {
  source: string
  title: string
  description: string
  author: string
  time: string
  comments: number
  likes: number
  isFeatured?: boolean
}

export function FeedPostCard({
  source,
  title,
  description,
  author,
  time,
  comments,
  likes,
  isFeatured = false,
}: FeedPostCardProps) {
  return (
    <Card className="hover:bg-muted/60 dark:hover:bg-muted/40 border-0 bg-transparent shadow-none ring-0 transition-colors">
      <CardHeader className="gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isFeatured ? <Badge>Featured</Badge> : null}
            <Badge variant="secondary">{source}</Badge>
          </div>
          <p className="text-muted-foreground text-xs">{time}</p>
        </div>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent className="text-muted-foreground flex items-center justify-between gap-2 text-xs">
        <p>Posted by {author}</p>
        <PostActionBar
          comments={comments}
          likes={likes}
          className="flex flex-wrap items-center justify-end gap-1"
        />
      </CardContent>
    </Card>
  )
}
