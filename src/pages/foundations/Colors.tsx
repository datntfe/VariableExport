import * as React from 'react'
import { TokenTable } from '@/components/system/TokenTable'
import { ColorSwatch } from '@/components/system/ColorSwatch'
import { Card } from '@/components/ui/card'
import { useTokenStore } from '@/lib/token-store'
import { useTheme } from '@/lib/theme-context'
import { getTokensByCategory, getTokensByGroup, getColorFamily } from '@/lib/token-helpers'

export const Colors: React.FC = () => {
  const { designTokens } = useTokenStore()
  const { theme } = useTheme()
  const brand = theme.brand.toLowerCase()
  
  const colorTokens = getTokensByCategory(designTokens, 'color', brand)
  const baseColors = getTokensByGroup(designTokens, 'base', brand)
  const semanticColors = getTokensByGroup(designTokens, 'semantic', brand)
  
  // Get color families
  const colorFamilies = React.useMemo(() => {
    if (!designTokens) return []
    const families = new Set<string>()
    Object.values(designTokens.colors).forEach(token => {
      const match = token.name.match(/colors\.([^.]+)\./)
      if (match) {
        families.add(match[1])
      }
    })
    return Array.from(families).sort()
  }, [designTokens])

  if (!designTokens || colorTokens.length === 0) {
    return (
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Color Palette</h1>
          <p className="text-muted-foreground">
            No color tokens found. Please import a Tokens Studio JSON file with color tokens.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Color Palette</h1>
        <p className="text-muted-foreground text-lg">
          The color system provides a comprehensive palette of base, semantic, and accent colors
          that work together to create accessible and consistent user interfaces.
        </p>
      </div>

      {baseColors.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Base Colors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {baseColors.map((token) => (
              <ColorSwatch
                key={token.name}
                name={token.name}
                value={String(token.value)}
                mode={token.mode}
              />
            ))}
          </div>
        </div>
      )}

      {colorFamilies.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Color Families</h2>
            {colorFamilies.map((family) => {
              const familyTokens = getColorFamily(designTokens, family, brand)
              if (familyTokens.length === 0) return null
            
            return (
              <div key={family} className="mb-8">
                <h3 className="text-xl font-semibold mb-4 capitalize">{family}</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4">
                  {familyTokens.map((token) => (
                    <ColorSwatch
                      key={token.name}
                      name={token.name.split('.').pop() || token.name}
                      value={String(token.value)}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {semanticColors.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Semantic Colors</h2>
          <p className="text-muted-foreground mb-4">
            Semantic colors adapt based on theme mode (light/dark) to ensure proper contrast and readability.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {semanticColors.map((token) => (
              <ColorSwatch
                key={`${token.name}-${token.mode}`}
                name={`${token.name} (${token.mode})`}
                value={String(token.value)}
                mode={token.mode}
              />
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-semibold mb-4">Token Table</h2>
        <TokenTable tokens={colorTokens} />
      </div>
    </div>
  )
}
