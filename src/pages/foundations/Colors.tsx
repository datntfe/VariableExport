import * as React from 'react'
import { getTokensByCategory, getTokensByGroup } from '@/lib/tokens'
import { TokenTable } from '@/components/system/TokenTable'
import { ColorSwatch } from '@/components/system/ColorSwatch'
import { Card } from '@/components/ui/card'

export const Colors: React.FC = () => {
  const colorTokens = getTokensByCategory('color')
  const baseColors = getTokensByGroup('base')
  const semanticColors = getTokensByGroup('semantic')

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Color Palette</h1>
        <p className="text-muted-foreground text-lg">
          The color system provides a comprehensive palette of base, semantic, and accent colors
          that work together to create accessible and consistent user interfaces.
        </p>
      </div>

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

      <div>
        <h2 className="text-2xl font-semibold mb-4">Token Table</h2>
        <TokenTable tokens={colorTokens} />
      </div>
    </div>
  )
}

