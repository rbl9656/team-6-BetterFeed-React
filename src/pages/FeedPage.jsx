import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CategoryTabs } from '../components/CategoryTabs'
import { FeedCard } from '../components/feed/FeedCard'
import { InfiniteScroller } from '../components/feed/InfiniteScroller'
import { PostComposer } from '../components/feed/PostComposer'
import { AIChatPanel } from '../components/AIChatPanel'
import { useFeed } from '../hooks/useFeed'
import { useAuthStore } from '../store/auth'
import { db } from '../lib/db'
import { useToast } from '../context/toast'

export const FeedPage = () => {
  const { user } = useAuthStore()
  const { pushToast } = useToast()
  const {
    posts,
    likedIds,
    savedIds,
    category,
    setCategory,
    isLoading,
    hasMore,
    loadMore,
    toggleLike,
    toggleSave,
    refresh,
  } = useFeed()
  const [categories, setCategories] = useState(['General'])
  const [activePost, setActivePost] = useState(null)
  const [panelOpen, setPanelOpen] = useState(false)

  useEffect(() => {
    db.getCategories().then(setCategories)
  }, [])

  const handleCreatePost = async (payload) => {
    if (!user) {
      pushToast({ title: 'Please sign in', description: 'You need an account to add to the feed.' })
      return
    }

    const thumbnailFallback = 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=800&q=80'
    await db.createPost({
      user_id: user.id,
      article_url: payload.url,
      title: payload.title,
      content: payload.summary,
      thumbnail_url: thumbnailFallback,
      category: payload.category,
      source: user.username,
    })
    pushToast({ title: 'Post added', description: 'Your article is now in the mix!', variant: 'success' })
    refresh()
  }

  return (
    <div className="bf-feed-page">
      <CategoryTabs categories={categories} active={category} onChange={setCategory} />

      <motion.section layout className="bf-feed-grid">
        {posts.map((post) => (
          <FeedCard
            key={post.id}
            post={post}
            isLiked={likedIds.has(post.id)}
            isSaved={savedIds.has(post.id)}
            onLike={() => toggleLike(post.id)}
            onSave={() => toggleSave(post.id)}
            onOpen={() => {
              setActivePost(post)
              setPanelOpen(true)
            }}
          />
        ))}

        <InfiniteScroller hasMore={hasMore} isLoading={isLoading} onLoadMore={loadMore} />
      </motion.section>

      <PostComposer categories={categories} onCreate={handleCreatePost} />

      <AIChatPanel open={panelOpen} onClose={() => setPanelOpen(false)} post={activePost} style="professor" />
    </div>
  )
}
