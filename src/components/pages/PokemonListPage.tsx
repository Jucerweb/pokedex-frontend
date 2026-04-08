import { usePokemonList } from '@/hooks/usePokemonList'
import { Layout } from '@/components/layout/Layout'
import { PokemonCard } from '@/components/pokemon/PokemonCard'

export function PokemonListPage() {
  const { pokemon, loading, error } = usePokemonList({ limit: 20 })

  return (
    <Layout>
      {loading && <p className="text-muted-foreground">Loading...</p>}
      {error && <p className="text-destructive">Error: {error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {pokemon.map((p) => (
            <PokemonCard key={p.id} pokemon={p} />
          ))}
        </div>
      )}
    </Layout>
  )
}
