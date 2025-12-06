/**
 * Token Parser for Tokens Studio JSON format
 * Parses and resolves tokens into structured design system format
 */

export interface DesignToken {
  name: string
  category: string
  group: string
  type: string
  value: string | number
  mode?: string
  scope?: string
  usage?: string
  rawValue?: any
}

export interface DesignTokens {
  borders: Record<string, DesignToken>
  radius: Record<string, DesignToken>
  icons: Record<string, DesignToken>
  spacing: Record<string, DesignToken>
  appearance: {
    light: Record<string, DesignToken>
    dark: Record<string, DesignToken>
  }
  colors: Record<string, DesignToken>
  typography: Record<string, DesignToken>
}

// Token value resolver
class TokenResolver {
  private tokens: Map<string, any> = new Map()
  private resolved: Map<string, any> = new Map()

  constructor(tokens: any) {
    this.buildTokenMap(tokens)
  }

  private buildTokenMap(obj: any, prefix = ''): void {
    if (typeof obj !== 'object' || obj === null) return

    for (const [key, value] of Object.entries(obj)) {
      if (key.startsWith('$')) continue // Skip metadata keys

      const fullKey = prefix ? `${prefix}.${key}` : key

      if (value && typeof value === 'object' && '$value' in value) {
        this.tokens.set(fullKey, value)
      } else if (value && typeof value === 'object') {
        this.buildTokenMap(value, fullKey)
      }
    }
  }

  private resolveReference(ref: string): any {
    if (this.resolved.has(ref)) {
      return this.resolved.get(ref)
    }

    const token = this.tokens.get(ref)
    if (!token) {
      console.warn(`Token reference not found: ${ref}`)
      return ref
    }

    const value = this.resolveValue(token.$value, token.$type)
    this.resolved.set(ref, value)
    return value
  }

  private resolveValue(value: any, type?: string): any {
    if (typeof value === 'string') {
      // Check for references {token.name}
      const refMatch = value.match(/\{([^}]+)\}/)
      if (refMatch) {
        const ref = refMatch[1]
        return this.resolveReference(ref)
      }

      // Check for expressions (simple multiplication)
      if (value.includes('*')) {
        const parts = value.split('*').map(p => p.trim())
        if (parts.length === 2) {
          const left = this.resolveValue(parts[0])
          const right = parseFloat(parts[1])
          if (!isNaN(left) && !isNaN(right)) {
            return `${parseFloat(left) * right}${left.toString().replace(/[\d.]/g, '')}`
          }
        }
      }
    }

    return value
  }

  getToken(key: string): any {
    return this.tokens.get(key)
  }

  resolveToken(key: string): any {
    const token = this.tokens.get(key)
    if (!token) return null
    return this.resolveValue(token.$value, token.$type)
  }
}

export function parseTokensStudioJSON(json: any): DesignTokens {
  const resolver = new TokenResolver(json)

  // Extract themes if available
  const themes = json.$themes || json.themes || []
  const lightTheme = themes.find((t: any) => t.name === 'light' || t.name === 'Light')
  const darkTheme = themes.find((t: any) => t.name === 'dark' || t.name === 'Dark')

  // Extract token sets
  const sets = json.sets || json.$sets || []
  const coreSet = sets.find((s: any) => s.name === 'core' || s.name === 'Core') || sets[0]

  // Helper to extract tokens from a set
  const extractTokens = (set: any, prefix = ''): Record<string, any> => {
    const tokens: Record<string, any> = {}
    
    if (!set || !set.selectedTokenSets) return tokens

    const tokenSets = set.selectedTokenSets || []
    const allTokens: any = {}

    // Collect all tokens from selected sets
    tokenSets.forEach((setName: string) => {
      const tokenSet = json[setName] || json[`$${setName}`]
      if (tokenSet) {
        Object.assign(allTokens, tokenSet)
      }
    })

    // Flatten tokens
    const flatten = (obj: any, path = ''): void => {
      for (const [key, value] of Object.entries(obj)) {
        if (key.startsWith('$')) continue

        const fullPath = path ? `${path}.${key}` : key

        if (value && typeof value === 'object' && '$value' in value) {
          tokens[fullPath] = value
        } else if (value && typeof value === 'object') {
          flatten(value, fullPath)
        }
      }
    }

    flatten(allTokens)
    return tokens
  }

  // Parse tokens by category
  const parseBorders = (tokens: Record<string, any>): Record<string, DesignToken> => {
    const borders: Record<string, DesignToken> = {}
    
    Object.entries(tokens).forEach(([key, token]: [string, any]) => {
      if (key.toLowerCase().includes('border') && key.toLowerCase().includes('width')) {
        const value = resolver.resolveToken(key) || token.$value || '0px'
        borders[key] = {
          name: key,
          category: 'border',
          group: 'border-width',
          type: token.$type || 'dimension',
          value: String(value),
          rawValue: token,
        }
      }
    })

    return borders
  }

  const parseRadius = (tokens: Record<string, any>): Record<string, DesignToken> => {
    const radius: Record<string, DesignToken> = {}
    
    Object.entries(tokens).forEach(([key, token]: [string, any]) => {
      if (key.toLowerCase().includes('radius') || key.toLowerCase().includes('borderradius')) {
        const value = resolver.resolveToken(key) || token.$value || '0px'
        radius[key] = {
          name: key,
          category: 'radius',
          group: 'border-radius',
          type: token.$type || 'dimension',
          value: String(value),
          rawValue: token,
        }
      }
    })

    return radius
  }

  const parseIcons = (tokens: Record<string, any>): Record<string, DesignToken> => {
    const icons: Record<string, DesignToken> = {}
    
    Object.entries(tokens).forEach(([key, token]: [string, any]) => {
      if (key.toLowerCase().includes('icon') && key.toLowerCase().includes('size')) {
        const value = resolver.resolveToken(key) || token.$value || '16px'
        icons[key] = {
          name: key,
          category: 'icon',
          group: 'icon-size',
          type: token.$type || 'dimension',
          value: String(value),
          rawValue: token,
        }
      }
    })

    return icons
  }

  const parseSpacing = (tokens: Record<string, any>): Record<string, DesignToken> => {
    const spacing: Record<string, DesignToken> = {}
    
    Object.entries(tokens).forEach(([key, token]: [string, any]) => {
      if (key.toLowerCase().includes('spacing') || key.toLowerCase().includes('space')) {
        const value = resolver.resolveToken(key) || token.$value || '0px'
        spacing[key] = {
          name: key,
          category: 'spacing',
          group: 'spacing-scale',
          type: token.$type || 'dimension',
          value: String(value),
          rawValue: token,
        }
      }
    })

    return spacing
  }

  const parseColors = (tokens: Record<string, any>, mode?: string): Record<string, DesignToken> => {
    const colors: Record<string, DesignToken> = {}
    
    Object.entries(tokens).forEach(([key, token]: [string, any]) => {
      if (key.toLowerCase().includes('color') || 
          (token.$type && token.$type.toLowerCase().includes('color'))) {
        const value = resolver.resolveToken(key) || token.$value || '#000000'
        colors[key] = {
          name: key,
          category: 'color',
          group: key.toLowerCase().includes('semantic') ? 'semantic' : 'base',
          type: token.$type || 'color',
          value: String(value),
          mode,
          rawValue: token,
        }
      }
    })

    return colors
  }

  const parseTypography = (tokens: Record<string, any>): Record<string, DesignToken> => {
    const typography: Record<string, DesignToken> = {}
    
    Object.entries(tokens).forEach(([key, token]: [string, any]) => {
      if (key.toLowerCase().includes('font') || 
          key.toLowerCase().includes('typography') ||
          key.toLowerCase().includes('lineheight') ||
          key.toLowerCase().includes('letterspacing')) {
        const value = resolver.resolveToken(key) || token.$value
        const group = key.toLowerCase().includes('size') ? 'font-size' :
                     key.toLowerCase().includes('weight') ? 'font-weight' :
                     key.toLowerCase().includes('family') ? 'font-family' :
                     key.toLowerCase().includes('lineheight') ? 'line-height' :
                     key.toLowerCase().includes('letterspacing') ? 'letter-spacing' : 'typography'
        
        typography[key] = {
          name: key,
          category: 'typography',
          group,
          type: token.$type || 'string',
          value: String(value),
          rawValue: token,
        }
      }
    })

    return typography
  }

  // Extract tokens from core set
  const coreTokens = extractTokens(coreSet)
  const lightTokens = lightTheme ? extractTokens(lightTheme) : {}
  const darkTokens = darkTheme ? extractTokens(darkTheme) : {}

  // Combine all tokens
  const allTokens = { ...coreTokens, ...lightTokens, ...darkTokens }

  return {
    borders: parseBorders(allTokens),
    radius: parseRadius(allTokens),
    icons: parseIcons(allTokens),
    spacing: parseSpacing(allTokens),
    appearance: {
      light: parseColors(lightTokens, 'light'),
      dark: parseColors(darkTokens, 'dark'),
    },
    colors: parseColors(allTokens),
    typography: parseTypography(allTokens),
  }
}

