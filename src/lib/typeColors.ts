import type { CSSProperties } from 'react'

export const TYPE_COLORS: Record<string, string> = {
  normal: '#9A9A9A',
  fire: '#E62829',
  water: '#2980EF',
  electric: '#C6A700',
  grass: '#3FA129',
  ice: '#5EB9B2',
  fighting: '#FF8000',
  poison: '#8F41CB',
  ground: '#915121',
  flying: '#4E8AB9',
  psychic: '#EF4179',
  bug: '#7BC306',
  rock: '#AFA981',
  ghost: '#704170',
  dragon: '#5060E1',
  dark: '#4F3F3D',
  steel: '#60A1B8',
  fairy: '#EF70EF',
}

export const FALLBACK_TYPE_COLOR = '#9A9A9A'

export function getTypeColor(type: string): string {
  return TYPE_COLORS[type.toLowerCase()] ?? FALLBACK_TYPE_COLOR
}

export function getTypeGradient(types: string[]): string {
  const primary = getTypeColor(types[0] ?? '')
  if (types.length <= 1) {
    return `linear-gradient(135deg, ${primary}, ${primary}cc)`
  }
  const secondary = getTypeColor(types[1])
  return `linear-gradient(135deg, ${primary}, ${secondary})`
}

export function getTypeBorderColor(type: string): string {
  return getTypeColor(type)
}

export function getTypeBackgroundStyle(types: string[]): CSSProperties {
  return { background: getTypeGradient(types) }
}
