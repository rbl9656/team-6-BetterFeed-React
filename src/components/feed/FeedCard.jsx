import { motion } from 'motion/react'
import { ArrowRight, ExternalLink, Sparkles } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { EngagementBar } from './EngagementBar'
import { ReadBadge } from './ReadBadge'
import { readingHistory } from '../../lib/readingHistory'

export const FeedCard = ({ post, isLiked, isSaved, onLike, onSave, onOpen }) => {
  const isRead = readingHistory.hasRead(post.id)

  const handleOpen = () => {
    readingHistory.markAsRead(post.id)
    onOpen()
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="bf-feed-card"
    >
      <div className="bf-feed-card__accent" aria-hidden />
      <div className="bf-feed-card__body">
        <div className="bf-feed-card__meta">
          <Badge>{post.category}</Badge>
          <span className="bf-feed-card__date">
            {new Date(post.created_at).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
            })}
          </span>
          <ReadBadge isRead={isRead} compact />
        </div>

        <div className="bf-feed-card__text">
          <h2 className="bf-feed-card__title">{post.title}</h2>
          <p className="bf-feed-card__summary">{post.content}</p>
        </div>

        <div className="bf-feed-card__source">
          <span className="bf-feed-card__source-tag">
            <Sparkles className="bf-icon-sm" />
            {post.source}
          </span>
          <a
            href={post.article_url}
            target="_blank"
            rel="noreferrer"
            className="bf-feed-card__link"
          >
            Read full article
            <ExternalLink className="bf-icon-sm" />
          </a>
        </div>

        <div className="bf-feed-card__media">
          <img
            src={post.thumbnail_url}
            alt={post.title}
            loading="lazy"
          />
        </div>

        <Button variant="secondary" className="bf-feed-card__cta" onClick={handleOpen}>
          <span className="bf-feed-card__cta-text">
            <Sparkles className="bf-icon-md" />
            Swipe for AI conversation
          </span>
          <ArrowRight className="bf-icon-md" />
        </Button>
      </div>

      <div className="bf-feed-card__actions">
        <EngagementBar
          likes={post.like_count}
          saves={post.save_count}
          views={post.view_count}
          onLike={onLike}
          onSave={onSave}
          active={{ like: isLiked, save: isSaved }}
        />
      </div>
    </motion.article>
  )
}