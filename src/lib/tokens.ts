/**
 * Design tokens file
 * This file will later import parsed tokens from tokens.json
 */

export interface DesignTokens {
  colors?: Record<string, string>
  spacing?: Record<string, string>
  borderRadius?: Record<string, string>
  typography?: Record<string, any>
}

// Placeholder - will be populated from tokens.json
export const tokens: DesignTokens = {}

