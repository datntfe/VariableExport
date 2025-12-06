import * as React from 'react'
import { TokenTable } from '@/components/system/TokenTable'
import { Card } from '@/components/ui/card'
import { useTokenStore } from '@/lib/token-store'
import { getTokensByCategory } from '@/lib/token-helpers'

export const Borders: React.FC = () => {
  const { designTokens } = useTokenStore()
  const borderTokens = getTokensByCategory(designTokens, 'border')

  if (!designTokens || borderTokens.length === 0) {
    return (
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Borders</h1>
          <p className="text-muted-foreground">
            No border tokens found. Please import a Tokens Studio JSON file with border tokens.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Borders</h1>
        <p className="text-muted-foreground text-lg">
          Border width tokens define the thickness of borders used throughout the design system.
          Use these tokens to maintain consistent border styling across components.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Visual Preview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {borderTokens.map((token) => {
            const width = String(token.value).replace('px', '')
            return (
              <Card key={token.name} className="p-6">
                <div className="flex flex-col gap-4">
                  <div
                    className="w-full h-24 bg-muted rounded-md flex items-center justify-center"
                    style={{
                      borderWidth: token.value,
                      borderStyle: 'solid',
                      borderColor: 'hsl(var(--border))',
                    }}
                  >
                    <span className="text-sm font-mono">{token.value}</span>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium">{token.name}</div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Divider Examples</h2>
        <div className="space-y-4">
          {borderTokens.slice(1, 4).map((token) => (
            <div key={token.name} className="space-y-2">
              <div className="text-sm font-medium">{token.name}</div>
              <div
                className="w-full"
                style={{
                  borderTopWidth: token.value,
                  borderTopStyle: 'solid',
                  borderTopColor: 'hsl(var(--border))',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Token Table</h2>
        <TokenTable tokens={borderTokens} />
      </div>
    </div>
  )
}
