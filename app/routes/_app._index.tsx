import { FeedPostCard } from "~/components/layout/feed-post-card"
import { Badge } from "~/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"

const summaryItems = [
  { label: "Groups", value: "6 updates" },
  { label: "Community", value: "14 new posts" },
  { label: "Messenger", value: "3 unread" },
]

const feedItems = [
  {
    id: 1,
    source: "Group: Student Council",
    title: "Spring Festival volunteer sign-up closes tomorrow",
    description:
      "Please register by 6 PM. Team assignments will be shared in each committee space.",
    author: "Student Council",
    time: "15m ago",
    comments: 8,
  },
  {
    id: 2,
    source: "Community: Lost Gadgets",
    title: "Found wireless earbuds near the library entrance",
    description: "If these are yours, send a message with the case color to verify ownership.",
    author: "2-3 J. Kim",
    time: "43m ago",
    comments: 11,
  },
  {
    id: 3,
    source: "Community: Secondhand Transactions",
    title: "Selling TI graphing calculator in good condition",
    description: "Includes cover and extra batteries. Available for pickup after study hall.",
    author: "3-2 H. Lee",
    time: "1h ago",
    comments: 5,
  },
  {
    id: 4,
    source: "Community: Secondhand Transactions",
    title: "Selling TI graphing calculator in good condition",
    description: "Includes cover and extra batteries. Available for pickup after study hall.",
    author: "3-2 H. Lee",
    time: "1h ago",
    comments: 5,
  },
]

export default function AppHomePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
      <section className="grid gap-3 sm:grid-cols-3">
        {summaryItems.map((item) => (
          <Card key={item.label} className="border-border/70">
            <CardHeader>
              <CardDescription>{item.label}</CardDescription>
              <CardTitle className="text-xl">{item.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </section>

      <Card className="border-border/70">
        <CardHeader className="gap-2">
          <div className="flex items-center gap-2">
            <Badge>Featured</Badge>
            <p className="text-muted-foreground text-xs">Pinned by administration</p>
          </div>
          <CardTitle>Academic schedule updates for next week</CardTitle>
          <CardDescription>
            Midterm preparation sessions and advisory room allocations were finalized. Check your
            group space for detailed time slots.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-xs">Posted 2h ago in Group: Academic Office</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-3 flex flex-col gap-3">
          {feedItems.map((item) => (
            <FeedPostCard key={item.id} {...item} />
          ))}
        </TabsContent>
        <TabsContent value="groups" className="mt-3 flex flex-col gap-3">
          {feedItems
            .filter((item) => item.source.startsWith("Group:"))
            .map((item) => (
              <FeedPostCard key={item.id} {...item} />
            ))}
        </TabsContent>
        <TabsContent value="community" className="mt-3 flex flex-col gap-3">
          {feedItems
            .filter((item) => item.source.startsWith("Community:"))
            .map((item) => (
              <FeedPostCard key={item.id} {...item} />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
