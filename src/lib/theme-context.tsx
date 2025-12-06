import * as React from 'react'

export interface ThemeSettings {
  brand: string
  accent: string
  radius: string
  mode: 'light' | 'dark' | 'system'
  scale: number
}

interface ThemeContextType {
  theme: ThemeSettings
  setTheme: (theme: Partial<ThemeSettings>) => void
  setBrand: (brand: string) => void
  setMode: (mode: 'light' | 'dark' | 'system') => void
}

const getStoredBrand = (): string => {
  if (typeof window === 'undefined') return 'Iris'
  return localStorage.getItem('brand') || 'Iris'
}

const getStoredMode = (): 'light' | 'dark' | 'system' => {
  if (typeof window === 'undefined') return 'light'
  return (localStorage.getItem('mode') as 'light' | 'dark' | 'system') || 'light'
}

const defaultTheme: ThemeSettings = {
  brand: getStoredBrand(),
  accent: 'Blue',
  radius: 'Medium',
  mode: getStoredMode(),
  scale: 100,
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = React.useState<ThemeSettings>(defaultTheme)

  // Apply theme mode to document
  React.useEffect(() => {
    const root = document.documentElement
    const effectiveMode = theme.mode === 'system' 
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme.mode

    if (effectiveMode === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme.mode])

  const setTheme = React.useCallback((updates: Partial<ThemeSettings>) => {
    setThemeState(prev => {
      const newTheme = { ...prev, ...updates }
      
      // Persist to localStorage
      if (updates.brand !== undefined) {
        localStorage.setItem('brand', updates.brand)
      }
      if (updates.mode !== undefined) {
        localStorage.setItem('mode', updates.mode)
      }
      
      return newTheme
    })
  }, [])

  const setBrand = React.useCallback((brand: string) => {
    setTheme({ brand })
  }, [setTheme])

  const setMode = React.useCallback((mode: 'light' | 'dark' | 'system') => {
    setTheme({ mode })
  }, [setTheme])

  const value = React.useMemo(
    () => ({
      theme,
      setTheme,
      setBrand,
      setMode,
    }),
    [theme, setTheme, setBrand, setMode]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
