/**
 * Design tokens data structure
 * This will be populated from tokens.json later
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
}

export interface TokenGroup {
  [key: string]: DesignToken[]
}

export const mockTokens: DesignToken[] = [
  // Borders
  { name: 'border.width.0', category: 'border', group: 'border-width', type: 'number', value: '0px', mode: 'default' },
  { name: 'border.width.1', category: 'border', group: 'border-width', type: 'number', value: '1px', mode: 'default' },
  { name: 'border.width.2', category: 'border', group: 'border-width', type: 'number', value: '2px', mode: 'default' },
  { name: 'border.width.4', category: 'border', group: 'border-width', type: 'number', value: '4px', mode: 'default' },
  
  // Radius
  { name: 'radius.sm', category: 'radius', group: 'border-radius', type: 'number', value: '0.25rem', mode: 'default' },
  { name: 'radius.md', category: 'radius', group: 'border-radius', type: 'number', value: '0.5rem', mode: 'default' },
  { name: 'radius.lg', category: 'radius', group: 'border-radius', type: 'number', value: '0.75rem', mode: 'default' },
  { name: 'radius.xl', category: 'radius', group: 'border-radius', type: 'number', value: '1rem', mode: 'default' },
  
  // Icons
  { name: 'icon.size.xs', category: 'icon', group: 'icon-size', type: 'number', value: '12px', mode: 'default' },
  { name: 'icon.size.sm', category: 'icon', group: 'icon-size', type: 'number', value: '14px', mode: 'default' },
  { name: 'icon.size.md', category: 'icon', group: 'icon-size', type: 'number', value: '16px', mode: 'default' },
  { name: 'icon.size.lg', category: 'icon', group: 'icon-size', type: 'number', value: '20px', mode: 'default' },
  { name: 'icon.size.xl', category: 'icon', group: 'icon-size', type: 'number', value: '24px', mode: 'default' },
  
  // Spacing
  { name: 'spacing.xs', category: 'spacing', group: 'spacing-scale', type: 'number', value: '0.25rem', mode: 'default' },
  { name: 'spacing.sm', category: 'spacing', group: 'spacing-scale', type: 'number', value: '0.5rem', mode: 'default' },
  { name: 'spacing.md', category: 'spacing', group: 'spacing-scale', type: 'number', value: '1rem', mode: 'default' },
  { name: 'spacing.lg', category: 'spacing', group: 'spacing-scale', type: 'number', value: '1.5rem', mode: 'default' },
  { name: 'spacing.xl', category: 'spacing', group: 'spacing-scale', type: 'number', value: '2rem', mode: 'default' },
  { name: 'spacing.2xl', category: 'spacing', group: 'spacing-scale', type: 'number', value: '3rem', mode: 'default' },
  
  // Colors - Base
  { name: 'color.base.white', category: 'color', group: 'base', type: 'color', value: '#ffffff', mode: 'default' },
  { name: 'color.base.black', category: 'color', group: 'base', type: 'color', value: '#000000', mode: 'default' },
  
  // Colors - Semantic
  { name: 'color.semantic.primary', category: 'color', group: 'semantic', type: 'color', value: 'hsl(222.2, 47.4%, 11.2%)', mode: 'light' },
  { name: 'color.semantic.primary', category: 'color', group: 'semantic', type: 'color', value: 'hsl(210, 40%, 98%)', mode: 'dark' },
  { name: 'color.semantic.background', category: 'color', group: 'semantic', type: 'color', value: 'hsl(0, 0%, 100%)', mode: 'light' },
  { name: 'color.semantic.background', category: 'color', group: 'semantic', type: 'color', value: 'hsl(222.2, 84%, 4.9%)', mode: 'dark' },
  { name: 'color.semantic.foreground', category: 'color', group: 'semantic', type: 'color', value: 'hsl(222.2, 84%, 4.9%)', mode: 'light' },
  { name: 'color.semantic.foreground', category: 'color', group: 'semantic', type: 'color', value: 'hsl(210, 40%, 98%)', mode: 'dark' },
  { name: 'color.semantic.muted', category: 'color', group: 'semantic', type: 'color', value: 'hsl(210, 40%, 96.1%)', mode: 'light' },
  { name: 'color.semantic.muted', category: 'color', group: 'semantic', type: 'color', value: 'hsl(217.2, 32.6%, 17.5%)', mode: 'dark' },
  
  // Typography
  { name: 'typography.font.family.sans', category: 'typography', group: 'font-family', type: 'string', value: 'system-ui, sans-serif', mode: 'default' },
  { name: 'typography.font.size.xs', category: 'typography', group: 'font-size', type: 'number', value: '0.75rem', mode: 'default' },
  { name: 'typography.font.size.sm', category: 'typography', group: 'font-size', type: 'number', value: '0.875rem', mode: 'default' },
  { name: 'typography.font.size.base', category: 'typography', group: 'font-size', type: 'number', value: '1rem', mode: 'default' },
  { name: 'typography.font.size.lg', category: 'typography', group: 'font-size', type: 'number', value: '1.125rem', mode: 'default' },
  { name: 'typography.font.size.xl', category: 'typography', group: 'font-size', type: 'number', value: '1.25rem', mode: 'default' },
  { name: 'typography.font.size.2xl', category: 'typography', group: 'font-size', type: 'number', value: '1.5rem', mode: 'default' },
  { name: 'typography.font.size.3xl', category: 'typography', group: 'font-size', type: 'number', value: '1.875rem', mode: 'default' },
  { name: 'typography.font.size.4xl', category: 'typography', group: 'font-size', type: 'number', value: '2.25rem', mode: 'default' },
  { name: 'typography.font.weight.normal', category: 'typography', group: 'font-weight', type: 'number', value: '400', mode: 'default' },
  { name: 'typography.font.weight.medium', category: 'typography', group: 'font-weight', type: 'number', value: '500', mode: 'default' },
  { name: 'typography.font.weight.semibold', category: 'typography', group: 'font-weight', type: 'number', value: '600', mode: 'default' },
  { name: 'typography.font.weight.bold', category: 'typography', group: 'font-weight', type: 'number', value: '700', mode: 'default' },
  { name: 'typography.line.height.tight', category: 'typography', group: 'line-height', type: 'number', value: '1.25', mode: 'default' },
  { name: 'typography.line.height.normal', category: 'typography', group: 'line-height', type: 'number', value: '1.5', mode: 'default' },
  { name: 'typography.line.height.relaxed', category: 'typography', group: 'line-height', type: 'number', value: '1.75', mode: 'default' },
]

export const getTokensByCategory = (category: string): DesignToken[] => {
  return mockTokens.filter(token => token.category === category)
}

export const getTokensByGroup = (group: string): DesignToken[] => {
  return mockTokens.filter(token => token.group === group)
}

export const getTokensByMode = (mode: string): DesignToken[] => {
  return mockTokens.filter(token => token.mode === mode)
}

export const getAllCategories = (): string[] => {
  return Array.from(new Set(mockTokens.map(token => token.category)))
}

export const getAllGroups = (): string[] => {
  return Array.from(new Set(mockTokens.map(token => token.group)))
}

export const getAllModes = (): string[] => {
  return Array.from(new Set(mockTokens.map(token => token.mode || 'default')))
}
