import { createBrowserRouter } from 'react-router'
import { PokedexPage } from '@/pages/PokedexPage'
import { PokemonDetailPage } from '@/pages/PokemonDetailPage'
import { TeamsPage } from '@/pages/TeamsPage'
import { TeamDetailPage } from '@/pages/TeamDetailPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

export const router = createBrowserRouter([
  { path: '/', element: <PokedexPage /> },
  { path: '/pokemon/:id', element: <PokemonDetailPage /> },
  { path: '/teams', element: <TeamsPage /> },
  { path: '/teams/:id', element: <TeamDetailPage /> },
  { path: '*', element: <NotFoundPage /> },
])
