import * as React from "react"

interface InfiniteScrollWrapperProps {
  children: React.ReactNode
  className?: string
  onLoadMore?: () => void
  hasMore?: boolean
  isLoading?: boolean
  loader?: React.ReactNode
  endMessage?: React.ReactNode
  useWindow?: boolean
}

export const InfiniteScrollWrapper: React.FC<InfiniteScrollWrapperProps> = ({
  children,
  className = "",
  onLoadMore,
  hasMore = true,
  isLoading = false,
  loader,
  endMessage,
  useWindow = true,
}) => {
  const rootRef = React.useRef<HTMLDivElement | null>(null)
  const observerRef = React.useRef<IntersectionObserver | null>(null)
  const loadMoreRef = React.useRef<HTMLDivElement | null>(null)

  const handleObserver = React.useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0]
      if (target.isIntersecting && hasMore && !isLoading && onLoadMore) {
        onLoadMore()
      }
    },
    [hasMore, isLoading, onLoadMore]
  )

  React.useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      return
    }

    const options = {
      root: useWindow ? null : rootRef.current,
      rootMargin: "0px 0px 200px 0px",
      threshold: 0,
    }

    observerRef.current = new IntersectionObserver(handleObserver, options)

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [handleObserver, useWindow])

  const rootClassName =
    `[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${className}`.trim()

  return (
    <div ref={rootRef} className={rootClassName}>
      {children}

      <div ref={loadMoreRef} className="h-px w-full" />

      {isLoading && loader && (
        <div className="flex w-full items-center justify-center py-4">{loader}</div>
      )}

      {!hasMore && endMessage && (
        <div className="flex w-full items-center justify-center py-4">{endMessage}</div>
      )}
    </div>
  )
}

export type { InfiniteScrollWrapperProps }
