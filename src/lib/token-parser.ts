/**
 * Token Parser for Tokens Studio JSON format
 * Parses and resolves tokens into structured design system format
 */

export interface DesignToken {
  name: string
  category: string
  group: string
  type: string
  value: string | number | string[]
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
  shadows?: Record<string, DesignToken>
  brands?: {
    [brandName: string]: {
      borders?: Record<string, DesignToken>
      radius?: Record<string, DesignToken>
      colors?: Record<string, DesignToken>
      typography?: Record<string, DesignToken>
      [key: string]: any
    }
  }
  availableBrands?: string[]
}

// Token value resolver with enhanced expression parsing
class TokenResolver {
  private tokens: Map<string, any> = new Map()
  private resolved: Map<string, any> = new Map()
  private resolving: Set<string> = new Set()

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
    // Prevent circular references
    if (this.resolving.has(ref)) {
      console.warn(`Circular reference detected: ${ref}`)
      return ref
    }

    if (this.resolved.has(ref)) {
      return this.resolved.get(ref)
    }

    const token = this.tokens.get(ref)
    if (!token) {
      console.warn(`Token reference not found: ${ref}`)
      return ref
    }

    this.resolving.add(ref)
    const value = this.resolveValue(token.$value, token.$type)
    this.resolved.set(ref, value)
    this.resolving.delete(ref)
    return value
  }

  private extractNumber(value: any): number | null {
    if (typeof value === 'number') return value
    if (typeof value === 'string') {
      const num = parseFloat(value.replace(/[^\d.-]/g, ''))
      return isNaN(num) ? null : num
    }
    return null
  }

  private extractUnit(value: any): string {
    if (typeof value === 'string') {
      const match = value.match(/[^\d.-]+$/)
      return match ? match[0] : ''
    }
    return ''
  }

  private resolveValue(value: any, type?: string): any {
    if (typeof value === 'string') {
      // Handle functions like roundTo()
      if (value.includes('roundTo(')) {
        // For now, return as-is and handle later if needed
        // This would require a math expression parser
        return value
      }

      // Check for multiple references in expressions
      const refPattern = /\{([^}]+)\}/g
      const refs = [...value.matchAll(refPattern)]
      
      if (refs.length > 0) {
        let resolved = value
        
        // Replace all references
        refs.forEach(([fullMatch, ref]) => {
          const refValue = this.resolveReference(ref)
          resolved = resolved.replace(fullMatch, String(refValue))
        })

        // Handle expressions with operators
        if (resolved.includes('*')) {
          const parts = resolved.split('*').map(p => p.trim())
          if (parts.length === 2) {
            const left = this.extractNumber(parts[0])
            const right = this.extractNumber(parts[1])
            const unit = this.extractUnit(parts[0]) || this.extractUnit(parts[1])
            
            if (left !== null && right !== null) {
              return `${left * right}${unit}`
            }
          }
        } else if (resolved.includes('+')) {
          const parts = resolved.split('+').map(p => p.trim())
          if (parts.length === 2) {
            const left = this.extractNumber(parts[0])
            const right = this.extractNumber(parts[1])
            const unit = this.extractUnit(parts[0]) || this.extractUnit(parts[1])
            
            if (left !== null && right !== null) {
              return `${left + right}${unit}`
            }
          }
        } else if (resolved.includes('-') && !resolved.startsWith('-')) {
          const parts = resolved.split('-').map(p => p.trim())
          if (parts.length === 2) {
            const left = this.extractNumber(parts[0])
            const right = this.extractNumber(parts[1])
            const unit = this.extractUnit(parts[0]) || this.extractUnit(parts[1])
            
            if (left !== null && right !== null) {
              return `${left - right}${unit}`
            }
          }
        } else if (resolved.includes('/')) {
          const parts = resolved.split('/').map(p => p.trim())
          if (parts.length === 2) {
            const left = this.extractNumber(parts[0])
            const right = this.extractNumber(parts[1])
            const unit = this.extractUnit(parts[0]) || this.extractUnit(parts[1])
            
            if (left !== null && right !== null && right !== 0) {
              return `${left / right}${unit}`
            }
          }
        } else {
          // Just a reference, return resolved value
          return resolved
        }
      }

      // Check for multi-value (space-separated)
      if (value.includes(' ') && refs.length > 0) {
        const parts = value.split(' ').filter(p => p.trim())
        const resolvedParts = parts.map(part => {
          if (part.match(/\{([^}]+)\}/)) {
            return this.resolveValue(part, type)
          }
          return part
        })
        return resolvedParts.join(' ')
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

  getAllTokens(): Map<string, any> {
    return this.tokens
  }
}

export function parseTokensStudioJSON(json: any): DesignTokens {
  const resolver = new TokenResolver(json)

  // Extract token sets directly from JSON (core, light, dark, theme)
  const coreTokens = json.core || {}
  const lightTokens = json.light || {}
  const darkTokens = json.dark || {}
  const themeTokens = json.theme || {}

  // Helper to flatten tokens from an object
  const flattenTokens = (obj: any, prefix = ''): Record<string, any> => {
    const tokens: Record<string, any> = {}
    
    const flatten = (current: any, path = ''): void => {
      for (const [key, value] of Object.entries(current)) {
        if (key.startsWith('$')) continue

        const fullPath = path ? `${path}.${key}` : key

        if (value && typeof value === 'object' && '$value' in value) {
          tokens[fullPath] = value
        } else if (value && typeof value === 'object' && !Array.isArray(value)) {
          flatten(value, fullPath)
        }
      }
    }

    flatten(obj, prefix)
    return tokens
  }

  // Flatten all token sets
  const coreFlat = flattenTokens(coreTokens)
  const lightFlat = flattenTokens(lightTokens)
  const darkFlat = flattenTokens(darkTokens)
  const themeFlat = flattenTokens(themeTokens)

  // Combine all tokens for resolution
  const allTokens = { ...coreFlat, ...lightFlat, ...darkFlat, ...themeFlat }

  // Parse borders (borderWidth)
  const parseBorders = (tokens: Record<string, any>): Record<string, DesignToken> => {
    const borders: Record<string, DesignToken> = {}
    
    Object.entries(tokens).forEach(([key, token]: [string, any]) => {
      if (token.$type === 'borderWidth' || 
          (key.toLowerCase().includes('border') && key.toLowerCase().includes('width'))) {
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

  // Parse radius
  const parseRadius = (tokens: Record<string, any>): Record<string, DesignToken> => {
    const radius: Record<string, DesignToken> = {}
    
    Object.entries(tokens).forEach(([key, token]: [string, any]) => {
      if (token.$type === 'borderRadius' || key.toLowerCase().includes('radius')) {
        const value = resolver.resolveToken(key) || token.$value || '0px'
        // Check if multi-value
        const valueStr = String(value)
        const isMultiValue = valueStr.includes(' ') && !valueStr.includes('rgba') && !valueStr.includes('rgb')
        
        radius[key] = {
          name: key,
          category: 'radius',
          group: 'border-radius',
          type: token.$type || 'dimension',
          value: isMultiValue ? valueStr.split(' ') : valueStr,
          rawValue: token,
        }
      }
    })

    return radius
  }

  // Parse icons
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

  // Parse spacing
  const parseSpacing = (tokens: Record<string, any>): Record<string, DesignToken> => {
    const spacing: Record<string, DesignToken> = {}
    
    Object.entries(tokens).forEach(([key, token]: [string, any]) => {
      if (token.$type === 'spacing' || key.toLowerCase().includes('spacing')) {
        const value = resolver.resolveToken(key) || token.$value || '0px'
        const valueStr = String(value)
        // Check if multi-value
        const isMultiValue = valueStr.includes(' ') && !valueStr.includes('rgba') && !valueStr.includes('rgb')
        
        spacing[key] = {
          name: key,
          category: 'spacing',
          group: 'spacing-scale',
          type: token.$type || 'dimension',
          value: isMultiValue ? valueStr.split(' ') : valueStr,
          rawValue: token,
        }
      }
    })

    return spacing
  }

  // Parse colors with family detection
  const parseColors = (tokens: Record<string, any>, mode?: string): Record<string, DesignToken> => {
    const colors: Record<string, DesignToken> = {}
    
    Object.entries(tokens).forEach(([key, token]: [string, any]) => {
      if (token.$type === 'color' || key.toLowerCase().includes('color')) {
        const value = resolver.resolveToken(key) || token.$value || '#000000'
        
        // Detect color family
        let group = 'base'
        if (key.includes('gray.') || key.includes('grey.')) {
          group = 'grayscale'
        } else if (key.includes('red.') || key.includes('blue.') || key.includes('green.') ||
                   key.includes('yellow.') || key.includes('orange.') || key.includes('purple.') ||
                   key.includes('pink.') || key.includes('indigo.') || key.includes('teal.')) {
          group = 'accent'
        } else if (key.includes('fg.') || key.includes('bg.') || key.includes('accent.') || 
                   key.includes('semantic.')) {
          group = 'semantic'
        } else if (key === 'colors.black' || key === 'colors.white') {
          group = 'base'
        }

        colors[key] = {
          name: key,
          category: 'color',
          group,
          type: token.$type || 'color',
          value: String(value),
          mode,
          rawValue: token,
        }
      }
    })

    return colors
  }

  // Parse typography
  const parseTypography = (tokens: Record<string, any>): Record<string, DesignToken> => {
    const typography: Record<string, DesignToken> = {}
    
    Object.entries(tokens).forEach(([key, token]: [string, any]) => {
      const type = token.$type || ''
      let group = 'typography'
      
      if (type === 'fontFamilies' || key.toLowerCase().includes('fontfamily') || key.toLowerCase().includes('fontfamilies')) {
        group = 'font-family'
      } else if (type === 'fontSizes' || key.toLowerCase().includes('fontsize') || key.toLowerCase().includes('fontsizes')) {
        group = 'font-size'
      } else if (type === 'fontWeights' || key.toLowerCase().includes('fontweight') || key.toLowerCase().includes('fontweights')) {
        group = 'font-weight'
      } else if (type === 'lineHeights' || key.toLowerCase().includes('lineheight') || key.toLowerCase().includes('lineheights')) {
        group = 'line-height'
      } else if (type === 'letterSpacing' || key.toLowerCase().includes('letterspacing')) {
        group = 'letter-spacing'
      } else if (type === 'paragraphSpacing' || key.toLowerCase().includes('paragraphspacing')) {
        group = 'paragraph-spacing'
      }

      if (group !== 'typography' || key.toLowerCase().includes('font') || 
          key.toLowerCase().includes('typography') || key.toLowerCase().includes('line') ||
          key.toLowerCase().includes('letter') || key.toLowerCase().includes('paragraph')) {
        const value = resolver.resolveToken(key) || token.$value
        
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

  // Parse shadows
  const parseShadows = (tokens: Record<string, any>): Record<string, DesignToken> => {
    const shadows: Record<string, DesignToken> = {}
    
    Object.entries(tokens).forEach(([key, token]: [string, any]) => {
      if (key.toLowerCase().includes('shadow') || key.toLowerCase().includes('boxshadow')) {
        // Shadow tokens can be complex objects
        const value = resolver.resolveToken(key) || token.$value || ''
        shadows[key] = {
          name: key,
          category: 'shadow',
          group: 'shadow',
          type: token.$type || 'shadow',
          value: String(value),
          rawValue: token,
        }
      }
    })

    return shadows
  }

  // Combine tokens from all sets
  const allCombined = { ...coreFlat, ...lightFlat, ...darkFlat, ...themeFlat }

  // Detect brand-specific token sets
  const brands: Record<string, any> = {}
  const availableBrands: string[] = []
  
  // Common brand names to look for
  const brandNames = ['iris', 'confidant', 'default', 'brand1', 'brand2', 'brand3']
  
  // Check for brand-specific sets in JSON
  Object.keys(json).forEach(key => {
    if (key.startsWith('$')) return
    
    const lowerKey = key.toLowerCase()
    const isBrand = brandNames.some(brand => lowerKey === brand || lowerKey.includes(brand))
    
    if (isBrand && json[key] && typeof json[key] === 'object') {
      const brandName = key
      availableBrands.push(brandName)
      const brandFlat = flattenTokens(json[key])
      brands[brandName] = {
        borders: parseBorders(brandFlat),
        radius: parseRadius(brandFlat),
        colors: parseColors(brandFlat),
        typography: parseTypography(brandFlat),
      }
    }
  })

  // If no brands found, create default structure
  if (availableBrands.length === 0) {
    availableBrands.push('Default')
  }

  return {
    borders: parseBorders(allCombined),
    radius: parseRadius(allCombined),
    icons: parseIcons(allCombined),
    spacing: parseSpacing(allCombined),
    appearance: {
      light: parseColors(lightFlat, 'light'),
      dark: parseColors(darkFlat, 'dark'),
    },
    colors: parseColors(coreFlat),
    typography: parseTypography(allCombined),
    shadows: parseShadows(allCombined),
    brands: Object.keys(brands).length > 0 ? brands : undefined,
    availableBrands: availableBrands.length > 0 ? availableBrands : ['Default'],
  }
}
