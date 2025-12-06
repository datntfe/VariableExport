import { DesignToken, DesignTokens } from './token-parser'

export const getTokensAsArray = (tokens: Record<string, DesignToken>): DesignToken[] => {
  return Object.values(tokens)
}

export const getTokensByCategory = (designTokens: DesignTokens | null, category: string): DesignToken[] => {
  if (!designTokens) return []

  switch (category) {
    case 'border':
      return getTokensAsArray(designTokens.borders)
    case 'radius':
      return getTokensAsArray(designTokens.radius)
    case 'icon':
      return getTokensAsArray(designTokens.icons)
    case 'spacing':
      return getTokensAsArray(designTokens.spacing)
    case 'color':
      return [
        ...getTokensAsArray(designTokens.colors),
        ...getTokensAsArray(designTokens.appearance.light),
        ...getTokensAsArray(designTokens.appearance.dark),
      ]
    case 'typography':
      return getTokensAsArray(designTokens.typography)
    default:
      return []
  }
}

export const getTokensByGroup = (designTokens: DesignTokens | null, group: string): DesignToken[] => {
  if (!designTokens) return []

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
    Object.keys(designTokens.typography).length
  )
}

