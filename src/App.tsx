import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PokemonListPage } from '@/components/pages/PokemonListPage'
import { PokemonDetailPage } from '@/components/pages/PokemonDetailPage'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokemonListPage />} />
        <Route path="/pokemon/:id" element={<PokemonDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}
