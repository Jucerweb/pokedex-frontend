import { Link } from 'react-router-dom'
import type { PokemonSummary } from '@/types/pokemon'
import { TypeBadge } from '@/components/ui/TypeBadge'
import { getTypeBorderColor, getTypeBackgroundStyle } from '@/lib/typeColors'

interface PokemonCardProps {
  pokemon: PokemonSummary
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const { id, name, imageUrl, types } = pokemon
  const dexNumber = `#${String(id).padStart(3, '0')}`
  const displayName = name.charAt(0).toUpperCase() + name.slice(1)
  const borderColor = getTypeBorderColor(types[0] ?? '')
  const headerStyle = getTypeBackgroundStyle(types)

  return (
    <Link
      to={`/pokemon/${id}`}
      className="group block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-transform duration-150 hover:scale-105 bg-card"
      style={{ borderTop: `4px solid ${borderColor}` }}
    >
      <div className="flex items-center justify-center py-6 px-4" style={headerStyle}>
        <img
          src={imageUrl}
          alt={displayName}
          className="h-24 w-24 object-contain drop-shadow-md"
          loading="lazy"
        />
      </div>
      <div className="p-3 flex flex-col gap-2">
        <div>
          <p className="text-xs text-muted-foreground font-mono">{dexNumber}</p>
          <p className="font-semibold text-sm leading-tight">{displayName}</p>
        </div>
        <div className="flex flex-wrap gap-1">
          {types.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </div>
      </div>
    </Link>
  )
}
