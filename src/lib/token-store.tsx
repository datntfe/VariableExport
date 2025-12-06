import * as React from 'react'
import { DesignToken, DesignTokens, parseTokensStudioJSON } from './token-parser'
import { useTheme } from './theme-context'

interface TokenStoreContextType {
  rawTokens: any | null
  designTokens: DesignTokens | null
  setRawTokens: (tokens: any) => void
  parseTokens: (json: any) => void
  hasTokens: boolean
  availableBrands: string[]
  getTokensForBrand: (brand: string) => DesignTokens | null
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

  const getTokensForBrand = React.useCallback((brand: string): DesignTokens | null => {
    if (!designTokens) return null
    
    // If no brand-specific tokens, return base tokens
    if (!designTokens.brands || !designTokens.brands[brand]) {
      return designTokens
    }

    const brandTokens = designTokens.brands[brand]
    
    // Merge brand-specific tokens with base tokens
    return {
      ...designTokens,
      borders: { ...designTokens.borders, ...(brandTokens.borders || {}) },
      radius: { ...designTokens.radius, ...(brandTokens.radius || {}) },
      colors: { ...designTokens.colors, ...(brandTokens.colors || {}) },
      typography: { ...designTokens.typography, ...(brandTokens.typography || {}) },
    }
  }, [designTokens])

  const availableBrands = React.useMemo(() => {
    return designTokens?.availableBrands || ['Default']
  }, [designTokens])

  const value = React.useMemo(
    () => ({
      rawTokens,
      designTokens,
      setRawTokens,
      parseTokens,
      hasTokens: designTokens !== null,
      availableBrands,
      getTokensForBrand,
    }),
    [rawTokens, designTokens, setRawTokens, parseTokens, availableBrands, getTokensForBrand]
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

