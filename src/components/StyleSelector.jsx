import { Wand2 } from 'lucide-react'
import { cn } from '../lib/utils'

export const StyleSelector = ({ options, selected, onSelect }) => {
  return (
    <div className="bf-style-selector">
      {options.map((option) => {
        const isActive = option.id === selected
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(option.id)}
            className={cn(
              'bf-style-selector__option',
              isActive && 'is-active'
            )}
          >
            <span
              className={cn(
                'bf-style-selector__icon',
                isActive && 'is-active'
              )}
            >
              <Wand2 className="bf-icon-md" />
            </span>
            <div>
              <p className="bf-style-selector__title">{option.label}</p>
              <p className="bf-style-selector__description">{option.description}</p>
            </div>
          </button>
        )
      })}
    </div>
  )
}
