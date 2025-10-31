import { useEffect, useMemo, useState } from 'react'
import { db } from '../lib/db'
import { useAuthStore } from '../store/auth'
import { useToast } from '../context/toast'

const createInteractionState = () => ({ likes: new Set(), saves: new Set() })

export const useFeed = () => {
  const { user } = useAuthStore()
  const { pushToast } = useToast()
  const [state, setState] = useState({
    posts: [],
    cursor: null,
    hasMore: true,
    isLoading: false,
    category: 'General',
    interactions: createInteractionState(),
  })

  const hydrateInteractions = async () => {
    if (!user) {
      setState((prev) => ({ ...prev, interactions: createInteractionState() }))
      return
    }
    const records = await db.getUserInteractions(user.id)
    const likes = new Set()
    const saves = new Set()
    records.forEach((item) => {
      if (item.interaction_type === 'like') likes.add(item.post_id)
      if (item.interaction_type === 'save') saves.add(item.post_id)
    })
    setState((prev) => ({ ...prev, interactions: { likes, saves } }))
  }

  useEffect(() => {
    hydrateInteractions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id])

  const load = async (options = {}) => {
    const reset = options?.reset ?? false
    const category = options?.category ?? state.category
    setState((prev) => ({ ...prev, isLoading: true }))
    const response = await db.getPosts({
      category,
      cursor: reset ? null : state.cursor,
    })
    setState((prev) => ({
      ...prev,
      posts: reset ? response.items : [...prev.posts, ...response.items],
      cursor: response.nextCursor,
      hasMore: Boolean(response.nextCursor),
      isLoading: false,
    }))
  }

  useEffect(() => {
    load({ reset: true, category: state.category })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.category])

  useEffect(() => {
    if (!state.posts.length) {
      load({ reset: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setCategory = (category) => {
    setState((prev) => ({
      ...prev,
      category,
      posts: [],
      cursor: null,
      hasMore: true,
    }))
  }

  const toggleInteraction = async (postId, type) => {
    if (!user) {
      pushToast({ title: 'Sign in required', description: 'Log in to interact with the feed.' })
      return
    }

    setState((prev) => {
      const interactions = createInteractionState()
      prev.interactions.likes.forEach((id) => interactions.likes.add(id))
      prev.interactions.saves.forEach((id) => interactions.saves.add(id))

      const targetSet = type === 'like' ? interactions.likes : interactions.saves
      const isActive = targetSet.has(postId)
      if (isActive) targetSet.delete(postId)
      else targetSet.add(postId)

      const posts = prev.posts.map((post) => {
        if (post.id !== postId) return post
        const delta = isActive ? -1 : 1
        if (type === 'like') {
          return { ...post, like_count: Math.max(0, post.like_count + delta) }
        }
        return { ...post, save_count: Math.max(0, post.save_count + delta) }
      })

      return {
        ...prev,
        posts,
        interactions,
      }
    })

    try {
      const result = await db.toggleInteraction(user.id, postId, type)
      setState((prev) => {
        const interactions = createInteractionState()
        prev.interactions.likes.forEach((id) => interactions.likes.add(id))
        prev.interactions.saves.forEach((id) => interactions.saves.add(id))
        const targetSet = type === 'like' ? interactions.likes : interactions.saves
        if (result.active) targetSet.add(postId)
        else targetSet.delete(postId)

        const posts = prev.posts.map((post) =>
          post.id === postId ? { ...post, like_count: result.post.like_count, save_count: result.post.save_count } : post
        )

        return {
          ...prev,
          posts,
          interactions,
        }
      })
    } catch (error) {
      console.error(error)
      pushToast({ title: 'Something went wrong', description: 'Unable to update the interaction.', variant: 'error' })
      await hydrateInteractions()
      const freshPost = await db.getPost(postId)
      if (freshPost) {
        setState((prev) => ({
          ...prev,
          posts: prev.posts.map((post) => (post.id === postId ? freshPost : post)),
        }))
      }
    }
  }

  const loadMore = async () => {
    if (!state.hasMore || state.isLoading) return
    await load({ reset: false })
  }

  const metadata = useMemo(
    () => ({
      likedIds: state.interactions.likes,
      savedIds: state.interactions.saves,
    }),
    [state.interactions]
  )

  return {
    posts: state.posts,
    category: state.category,
    isLoading: state.isLoading,
    hasMore: state.hasMore,
    likedIds: metadata.likedIds,
    savedIds: metadata.savedIds,
    setCategory,
    loadMore,
    toggleLike: (postId) => toggleInteraction(postId, 'like'),
    toggleSave: (postId) => toggleInteraction(postId, 'save'),
    refresh: () => load({ reset: true }),
  }
}
