import { useState, useEffect } from 'react'
import type { PokemonDetail, PokemonStat, PokemonAbility, EvolutionStep } from '@/types/pokemon'
import { getCached, setCache } from './cache'

const BASE_URL = 'https://pokeapi.co/api/v2'

interface UsePokemonDetailResult {
  pokemon: PokemonDetail | null
  loading: boolean
  error: string | null
}

function buildSpriteUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}

interface EvolutionChainNode {
  species: { name: string; url: string }
  evolution_details: Array<{ trigger: { name: string }; min_level: number | null }>
  evolves_to: EvolutionChainNode[]
}

function parseEvolutionChain(node: EvolutionChainNode): EvolutionStep[] {
  const steps: EvolutionStep[] = []
  const idMatch = node.species.url.match(/\/(\d+)\/$/)
  const id = idMatch ? parseInt(idMatch[1], 10) : 0

  const detail = node.evolution_details[0]
  steps.push({
    id,
    name: node.species.name,
    imageUrl: buildSpriteUrl(id),
    trigger: detail?.trigger?.name,
    minLevel: detail?.min_level ?? undefined,
  })

  for (const next of node.evolves_to) {
    steps.push(...parseEvolutionChain(next))
  }

  return steps
}

async function fetchWithCache<T>(url: string, signal: AbortSignal): Promise<T> {
  const cached = getCached<T>(url)
  if (cached) return cached
  const res = await fetch(url, { signal })
  if (!res.ok) {
    const err = new Error(res.status === 404 ? 'Not found' : `Fetch failed: ${res.status}`)
    ;(err as Error & { status: number }).status = res.status
    throw err
  }
  const data: T = await res.json()
  setCache(url, data)
  return data
}

export function usePokemonDetail(idOrName: string | number): UsePokemonDetailResult {
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!idOrName && idOrName !== 0) return

    const controller = new AbortController()

    async function fetchDetail() {
      setLoading(true)
      setError(null)
      setPokemon(null)

      try {
        const baseUrl = `${BASE_URL}/pokemon/${idOrName}`
        const baseData = await fetchWithCache<{
          id: number
          name: string
          height: number
          weight: number
          types: Array<{ type: { name: string } }>
          stats: Array<{ stat: { name: string }; base_stat: number; effort: number }>
          abilities: Array<{ ability: { name: string }; is_hidden: boolean }>
        }>(baseUrl, controller.signal)

        const id = baseData.id

        const types = baseData.types.map((t) => t.type.name)
        const stats: PokemonStat[] = baseData.stats.map((s) => ({
          name: s.stat.name,
          baseStat: s.base_stat,
          effort: s.effort,
        }))
        const abilities: PokemonAbility[] = baseData.abilities.map((a) => ({
          name: a.ability.name,
          isHidden: a.is_hidden,
        }))

        const speciesUrl = `${BASE_URL}/pokemon-species/${id}`
        const speciesData = await fetchWithCache<{
          name: string
          flavor_text_entries: Array<{ flavor_text: string; language: { name: string } }>
          genera: Array<{ genus: string; language: { name: string } }>
          evolution_chain: { url: string }
        }>(speciesUrl, controller.signal)

        const flavorEntry = speciesData.flavor_text_entries.find((e) => e.language.name === 'en')
        const generaEntry = speciesData.genera.find((g) => g.language.name === 'en')

        let evolutionChain: EvolutionStep[] = []
        try {
          const evoData = await fetchWithCache<{ chain: EvolutionChainNode }>(
            speciesData.evolution_chain.url,
            controller.signal
          )
          evolutionChain = parseEvolutionChain(evoData.chain)
        } catch (evoErr) {
          console.warn('Failed to fetch evolution chain:', evoErr)
        }

        if (!controller.signal.aborted) {
          setPokemon({
            id,
            name: baseData.name,
            imageUrl: buildSpriteUrl(id),
            types,
            stats,
            abilities,
            height: baseData.height,
            weight: baseData.weight,
            species: {
              name: speciesData.name,
              flavorText: flavorEntry?.flavor_text.replace(/\f/g, ' ') ?? '',
              genera: generaEntry?.genus ?? '',
            },
            evolutionChain,
          })
        }
      } catch (err) {
        if (controller.signal.aborted) return
        const msg = err instanceof Error ? err.message : 'Failed to fetch Pokemon'
        setError(msg)
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchDetail()

    return () => controller.abort()
  }, [idOrName])

  return { pokemon, loading, error }
}
