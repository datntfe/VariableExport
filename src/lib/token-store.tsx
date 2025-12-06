import * as React from 'react'
import { DesignToken, parseTokensStudioJSON } from './token-parser'

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

interface TokenStoreContextType {
  rawTokens: any | null
  designTokens: DesignTokens | null
  setRawTokens: (tokens: any) => void
  parseTokens: (json: any) => void
  hasTokens: boolean
}

const TokenStoreContext = React.createContext<TokenStoreContextType | undefined>(undefined)

export const TokenStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rawTokens, setRawTokensState] = React.useState<any | null>(null)
  const [designTokens, setDesignTokens] = React.useState<DesignTokens | null>(null)

  const setRawTokens = React.useCallback((tokens: any) => {
    setRawTokensState(tokens)
  }, [])

  const parseTokens = React.useCallback((json: any) => {
    try {
      const parsed = parseTokensStudioJSON(json)
      setDesignTokens(parsed)
    } catch (error) {
      console.error('Failed to parse tokens:', error)
      throw error
    }
  }, [])

  const value = React.useMemo(
    () => ({
      rawTokens,
      designTokens,
      setRawTokens,
      parseTokens,
      hasTokens: designTokens !== null,
    }),
    [rawTokens, designTokens, setRawTokens, parseTokens]
  )

  return <TokenStoreContext.Provider value={value}>{children}</TokenStoreContext.Provider>
}

export const useTokenStore = () => {
  const context = React.useContext(TokenStoreContext)
  if (!context) {
    throw new Error('useTokenStore must be used within TokenStoreProvider')
  }
  return context
}

