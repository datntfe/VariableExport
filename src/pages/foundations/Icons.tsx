import * as React from 'react'
import { TokenTable } from '@/components/system/TokenTable'
import { Card } from '@/components/ui/card'
import { useTokenStore } from '@/lib/token-store'
import { getTokensByCategory } from '@/lib/token-helpers'

export const Icons: React.FC = () => {
  const { designTokens } = useTokenStore()
  const iconTokens = getTokensByCategory(designTokens, 'icon')

  if (!designTokens || iconTokens.length === 0) {
    return (
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Icon System</h1>
          <p className="text-muted-foreground">
            No icon tokens found. Please import a Tokens Studio JSON file with icon tokens.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Icon System</h1>
        <p className="text-muted-foreground text-lg">
          Icon size tokens define consistent dimensions for icons throughout the design system.
          Use these tokens to ensure icons scale appropriately across different contexts.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Visual Preview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {iconTokens.map((token) => {
            const size = String(token.value).replace('px', '')
            return (
              <Card key={token.name} className="p-6">
                <div className="flex flex-col gap-4 items-center">
                  <div
                    className="bg-primary rounded-md flex items-center justify-center"
                    style={{
                      width: token.value,
                      height: token.value,
                    }}
                  >
                    <div
                      className="bg-primary-foreground rounded-sm"
                      style={{
                        width: `calc(${token.value} * 0.6)`,
                        height: `calc(${token.value} * 0.6)`,
                      }}
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium font-mono">{token.name}</div>
                    <div className="text-xs text-muted-foreground font-mono mt-1">
                      {String(token.value)}
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Token Table</h2>
        <TokenTable tokens={iconTokens} />
      </div>
    </div>
  )
}
