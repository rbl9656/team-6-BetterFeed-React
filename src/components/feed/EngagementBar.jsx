import { Bookmark, Eye, Heart } from 'lucide-react'
import { cn } from '../../lib/utils'

export const EngagementBar = ({ likes, saves, views, onLike, onSave, active }) => {
  return (
    <div className="bf-engagement-bar">
      <button
        type="button"
        onClick={onLike}
        className={cn(
          'bf-engagement-bar__button',
          active.like && 'is-active'
        )}
      >
        <Heart className={cn('bf-icon-sm', active.like && 'is-active')} />
        <span className="bf-engagement-bar__value">{likes}</span>
      </button>
      <button
        type="button"
        onClick={onSave}
        className={cn(
          'bf-engagement-bar__button bf-engagement-bar__button--save',
          active.save && 'is-active'
        )}
      >
        <Bookmark className={cn('bf-icon-sm', active.save && 'is-active')} />
        <span className="bf-engagement-bar__value">{saves}</span>
      </button>
      <div className="bf-engagement-bar__views">
        <Eye className="bf-icon-sm" />
        <span className="bf-engagement-bar__value">{views}</span>
      </div>
    </div>
  )
}
