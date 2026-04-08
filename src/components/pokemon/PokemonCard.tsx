import { cn } from '@/lib/utils'
import { TypeBadge } from '@/components/ui/TypeBadge'
import type { PokemonSummary } from '@/types/pokemon'

interface PokemonCardProps {
  pokemon: PokemonSummary
  className?: string
}

function PokemonCard({ pokemon, className }: PokemonCardProps) {
  const dexNumber = `#${String(pokemon.id).padStart(3, '0')}`
  const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)

  return (
    <div
      data-slot="pokemon-card"
      className={cn(
        'flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm transition-shadow hover:shadow-md',
        className
      )}
    >
      <img
        src={pokemon.imageUrl}
        alt={name}
        className="size-24 object-contain"
      />
      <span className="text-xs text-muted-foreground">{dexNumber}</span>
      <span className="text-sm font-semibold">{name}</span>
      <div className="flex flex-wrap justify-center gap-1">
        {pokemon.types.map((type) => (
          <TypeBadge key={type} type={type} />
        ))}
      </div>
    </div>
  )
}

export { PokemonCard }
