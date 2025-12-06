/**
 * Theme configuration
 * Maps design tokens to Tailwind CSS semantic classes
 */

export interface ThemeConfig {
  light: Record<string, string>
  dark: Record<string, string>
}

// Placeholder theme mapping
// Will be populated from tokens.json
export const themeConfig: ThemeConfig = {
  light: {},
  dark: {},
}

