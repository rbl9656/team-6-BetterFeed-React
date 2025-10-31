import { useEffect, useRef } from 'react'

export const InfiniteScroller = ({ hasMore, isLoading, onLoadMore }) => {
  const ref = useRef(null)

  useEffect(() => {
    if (!hasMore || isLoading) return
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onLoadMore()
        }
      })
    })

    observer.observe(node)
    return () => observer.disconnect()
  }, [hasMore, isLoading, onLoadMore])

  return (
    <div ref={ref} className="bf-infinite-scroller">
      {isLoading ? 'Loading more stories…' : hasMore ? 'Keep scrolling…' : 'You reached the end 🎉'}
    </div>
  )
}
