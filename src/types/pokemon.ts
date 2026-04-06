export interface PokemonStat {
  name: string
  baseStat: number
  effort: number
}

export interface PokemonAbility {
  name: string
  isHidden: boolean
}

export interface EvolutionStep {
  id: number
  name: string
  imageUrl: string
  trigger?: string
  minLevel?: number
}

export interface PokemonSummary {
  id: number
  name: string
  imageUrl: string
  types: string[]
}

export interface PokemonDetail {
  id: number
  name: string
  imageUrl: string
  types: string[]
  stats: PokemonStat[]
  abilities: PokemonAbility[]
  height: number
  weight: number
  species: {
    name: string
    flavorText: string
    genera: string
  }
  evolutionChain: EvolutionStep[]
}

export interface PokemonListResult {
  pokemon: PokemonSummary[]
  total: number
}

// National dex range [start, end] (inclusive) per generation
export const GENERATION_RANGES: Record<number, [number, number]> = {
  1: [1, 151],
  2: [152, 251],
  3: [252, 386],
  4: [387, 493],
  5: [494, 649],
  6: [650, 721],
  7: [722, 809],
  8: [810, 905],
  9: [906, 1025],
}
