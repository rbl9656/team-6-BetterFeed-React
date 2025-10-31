import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const badgeVariants = cva('bf-badge', {
  variants: {
    variant: {
      default: 'bf-badge--default',
      muted: 'bf-badge--muted',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export const Badge = ({ className, variant, ...props }) => (
  <div className={cn(badgeVariants({ variant }), className)} {...props} />
)
