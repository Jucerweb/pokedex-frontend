import { cn } from '@/lib/utils'
import { TYPE_COLORS, FALLBACK_TYPE_COLOR } from '@/lib/typeColors'

interface TypeBadgeProps {
  type: string
  className?: string
}

function TypeBadge({ type, className }: TypeBadgeProps) {
  const normalized = type.toLowerCase()
  const backgroundColor = TYPE_COLORS[normalized] ?? FALLBACK_TYPE_COLOR
  const label = normalized.charAt(0).toUpperCase() + normalized.slice(1)

  return (
    <span
      data-slot="type-badge"
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold text-white',
        className
      )}
      style={{ backgroundColor }}
    >
      {label}
    </span>
  )
}

export { TypeBadge }
