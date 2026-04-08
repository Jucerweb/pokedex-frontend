import { PokemonList } from '@/components/pokemon/PokemonList'

export function App() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Pokedex</h1>
      </header>
      <PokemonList />
    </div>
  )
}
