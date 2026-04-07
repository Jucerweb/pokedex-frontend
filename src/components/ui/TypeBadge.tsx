import { cn } from '@/lib/utils'
import { getTypeColor } from '@/lib/typeColors'

interface TypeBadgeProps {
  type: string
  className?: string
}

function TypeBadge({ type, className }: TypeBadgeProps) {
  return (
    <span
      data-slot="type-badge"
      className={cn(
        'inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium text-white capitalize',
        className
      )}
      style={{ backgroundColor: getTypeColor(type) }}
    >
      {type}
    </span>
  )
}

export { TypeBadge }
