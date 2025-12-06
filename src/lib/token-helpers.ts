import { DesignToken, DesignTokens } from './token-parser'

export const getTokensAsArray = (tokens: Record<string, DesignToken>): DesignToken[] => {
  return Object.values(tokens)
}

// Helper to get tokens with brand filtering
const getFilteredTokens = (designTokens: DesignTokens | null, brand?: string): DesignTokens | null => {
  if (!designTokens) return null
  
  // If no brand specified or no brand-specific tokens, return base tokens
  if (!brand || !designTokens.brands || !designTokens.brands[brand]) {
    return designTokens
  }

  const brandTokens = designTokens.brands[brand]
  
  // Merge brand-specific tokens with base tokens (brand tokens override base)
  return {
    ...designTokens,
    borders: { ...designTokens.borders, ...(brandTokens.borders || {}) },
    radius: { ...designTokens.radius, ...(brandTokens.radius || {}) },
    colors: { ...designTokens.colors, ...(brandTokens.colors || {}) },
    typography: { ...designTokens.typography, ...(brandTokens.typography || {}) },
  }
}

export const getTokensByCategory = (designTokens: DesignTokens | null, category: string, brand?: string): DesignToken[] => {
  const filtered = getFilteredTokens(designTokens, brand)
  if (!filtered) return []

  switch (category) {
    case 'border':
      return getTokensAsArray(filtered.borders)
    case 'radius':
      return getTokensAsArray(filtered.radius)
    case 'icon':
      return getTokensAsArray(filtered.icons)
    case 'spacing':
      return getTokensAsArray(filtered.spacing)
    case 'color':
      return [
        ...getTokensAsArray(filtered.colors),
        ...getTokensAsArray(filtered.appearance.light),
        ...getTokensAsArray(filtered.appearance.dark),
      ]
    case 'typography':
      return getTokensAsArray(filtered.typography)
    default:
      return []
  }
}

export const getTokensByGroup = (designTokens: DesignTokens | null, group: string, brand?: string): DesignToken[] => {
  const filtered = getFilteredTokens(designTokens, brand)
  if (!filtered) return []

  const allTokens: DesignToken[] = [
    ...getTokensAsArray(filtered.borders),
    ...getTokensAsArray(filtered.radius),
    ...getTokensAsArray(filtered.icons),
    ...getTokensAsArray(filtered.spacing),
    ...getTokensAsArray(filtered.colors),
    ...getTokensAsArray(filtered.appearance.light),
    ...getTokensAsArray(filtered.appearance.dark),
    ...getTokensAsArray(filtered.typography),
  ]

  return allTokens.filter(token => token.group === group)
}

export const getAllCategories = (designTokens: DesignTokens | null): string[] => {
  if (!designTokens) return []
  return ['border', 'radius', 'icon', 'spacing', 'color', 'typography']
}

export const getAllGroups = (designTokens: DesignTokens | null): string[] => {
  if (!designTokens) return []

  const groups = new Set<string>()
  const allTokens: DesignToken[] = [
    ...getTokensAsArray(designTokens.borders),
    ...getTokensAsArray(designTokens.radius),
    ...getTokensAsArray(designTokens.icons),
    ...getTokensAsArray(designTokens.spacing),
    ...getTokensAsArray(designTokens.colors),
    ...getTokensAsArray(designTokens.appearance.light),
    ...getTokensAsArray(designTokens.appearance.dark),
    ...getTokensAsArray(designTokens.typography),
  ]

  allTokens.forEach(token => {
    if (token.group) {
      groups.add(token.group)
    }
  })

  return Array.from(groups)
}

export const getAllModes = (designTokens: DesignTokens | null): string[] => {
  if (!designTokens) return ['default']
  
  const modes = new Set<string>(['default'])
  const allTokens: DesignToken[] = [
    ...getTokensAsArray(designTokens.appearance.light),
    ...getTokensAsArray(designTokens.appearance.dark),
  ]

  allTokens.forEach(token => {
    if (token.mode) {
      modes.add(token.mode)
    }
  })

  return Array.from(modes)
}

export const getTotalTokenCount = (designTokens: DesignTokens | null): number => {
  if (!designTokens) return 0

  return (
    Object.keys(designTokens.borders).length +
    Object.keys(designTokens.radius).length +
    Object.keys(designTokens.icons).length +
    Object.keys(designTokens.spacing).length +
    Object.keys(designTokens.colors).length +
    Object.keys(designTokens.appearance.light).length +
    Object.keys(designTokens.appearance.dark).length +
    Object.keys(designTokens.typography).length +
    (designTokens.shadows ? Object.keys(designTokens.shadows).length : 0)
  )
}

export const getColorFamily = (designTokens: DesignTokens | null, family: string, brand?: string): DesignToken[] => {
  const filtered = getFilteredTokens(designTokens, brand)
  if (!filtered) return []
  
  return Object.values(filtered.colors).filter(token => 
    token.name.includes(`colors.${family}.`)
  )
}

