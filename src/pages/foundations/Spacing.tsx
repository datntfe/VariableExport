import * as React from 'react'
import { TokenTable } from '@/components/system/TokenTable'
import { Card } from '@/components/ui/card'
import { useTokenStore } from '@/lib/token-store'
import { getTokensByCategory } from '@/lib/token-helpers'

export const Spacing: React.FC = () => {
  const { designTokens } = useTokenStore()
  const spacingTokens = getTokensByCategory(designTokens, 'spacing')

  if (!designTokens || spacingTokens.length === 0) {
    return (
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Spacing Scale</h1>
          <p className="text-muted-foreground">
            No spacing tokens found. Please import a Tokens Studio JSON file with spacing tokens.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Spacing Scale</h1>
        <p className="text-muted-foreground text-lg">
          Spacing tokens represent a consistent rhythm for margins, padding, and gaps.
          These tokens create visual harmony and maintain alignment across the interface.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Horizontal Spacing Preview</h2>
        <div className="space-y-4">
          {spacingTokens.map((token) => (
            <Card key={token.name} className="p-4">
              <div className="flex items-center gap-4">
                <div className="text-sm font-medium font-mono w-32">{token.name}</div>
                <div
                  className="bg-primary h-8 flex items-center justify-center px-2"
                  style={{ width: token.value, minWidth: token.value }}
                >
                  <span className="text-primary-foreground text-xs font-mono">
                    {String(token.value)}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Stack Preview (Vertical Spacing)</h2>
        <Card className="p-6">
          <div className="space-y-4">
            {spacingTokens.slice(0, 4).map((token, index) => (
              <div key={token.name} className="flex items-center gap-4">
                <div className="text-sm font-medium font-mono w-32">{token.name}</div>
                <div
                  className="bg-primary h-12 rounded-md flex items-center justify-center px-4"
                  style={{ width: '100%' }}
                >
                  <span className="text-primary-foreground text-xs">
                    Element with {String(token.value)} spacing
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Token Table</h2>
        <TokenTable tokens={spacingTokens} />
      </div>
    </div>
  )
}
