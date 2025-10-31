import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { db } from '../lib/db'
import { FeedCard } from '../components/feed/FeedCard'
import { AIChatPanel } from '../components/AIChatPanel'
import { useAuthStore } from '../store/auth'
import { useToast } from '../context/toast'

export const PostPage = () => {
  const { id } = useParams()
  const { user } = useAuthStore()
  const { pushToast } = useToast()
  const [post, setPost] = useState(null)
  const [panelOpen, setPanelOpen] = useState(false)
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!id) return
    db.getPost(Number(id)).then((found) => {
      setPost(found)
    })
    if (user) {
      db.getUserInteractions(user.id).then((interactions) => {
        setLiked(interactions.some((item) => item.post_id === Number(id) && item.interaction_type === 'like'))
        setSaved(interactions.some((item) => item.post_id === Number(id) && item.interaction_type === 'save'))
      })
    }
  }, [id, user?.id])

  const toggle = async (type) => {
    if (!user || !post) {
      pushToast({ title: 'Please sign in to interact' })
      return
    }
    const result = await db.toggleInteraction(user.id, post.id, type)
    setPost(result.post)
    if (type === 'like') setLiked(result.active)
    if (type === 'save') setSaved(result.active)
  }

  if (!post) {
    return (
      <div className="bf-page-loading">
        Loading post…
      </div>
    )
  }

  return (
    <div className="bf-page bf-page--narrow">
      <motion.div layout>
        <FeedCard
          post={post}
          isLiked={liked}
          isSaved={saved}
          onLike={() => toggle('like')}
          onSave={() => toggle('save')}
          onOpen={() => setPanelOpen(true)}
        />
      </motion.div>

      <AIChatPanel open={panelOpen} onClose={() => setPanelOpen(false)} post={post} style="professor" />
    </div>
  )
}
