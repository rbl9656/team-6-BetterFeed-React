import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'bf-button',
  {
    variants: {
      variant: {
        default: 'bf-button--default',
        secondary: 'bf-button--secondary',
        outline: 'bf-button--outline',
        ghost: 'bf-button--ghost',
      },
      size: {
        default: 'bf-button--md',
        sm: 'bf-button--sm',
        lg: 'bf-button--lg',
        icon: 'bf-button--icon',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
