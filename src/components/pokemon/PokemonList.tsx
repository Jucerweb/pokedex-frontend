import { usePokemonList } from '@/hooks'
import { PokemonCard } from './PokemonCard'

interface PokemonListProps {
  generation?: number
  limit?: number
  offset?: number
}

function PokemonList({ generation, limit, offset }: PokemonListProps) {
  const { pokemon, loading, error } = usePokemonList({ generation, limit, offset })

  if (loading) {
    return <p className="text-center text-muted-foreground">Loading...</p>
  }

  if (error) {
    return <p className="text-center text-destructive">{error}</p>
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {pokemon.map((p) => (
        <PokemonCard key={p.id} pokemon={p} />
      ))}
    </div>
  )
}

export { PokemonList }
