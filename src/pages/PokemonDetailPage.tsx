import { useParams } from 'react-router'

export function PokemonDetailPage() {
  const { id } = useParams()
  return <div>PokemonDetailPage {id}</div>
}
