import { CheckCircle } from 'lucide-react'

export const ReadBadge = ({ isRead, compact = false }) => {
  if (!isRead) return null

  return (
    <div className={`bf-read-badge ${compact ? 'bf-read-badge--compact' : ''}`}>
      <CheckCircle size={compact ? 14 : 16} />
      {!compact && <span>Read</span>}
    </div>
  )
}