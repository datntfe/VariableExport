import * as React from 'react'
import { TokenTable } from '@/components/system/TokenTable'
import { Card } from '@/components/ui/card'
import { useTokenStore } from '@/lib/token-store'
import { getTokensByCategory, formatTokenDisplayName } from '@/lib/token-helpers'

export const Radius: React.FC = () => {
  const { designTokens } = useTokenStore()
  const radiusTokens = getTokensByCategory(designTokens, 'radius')

  if (!designTokens || radiusTokens.length === 0) {
    return (
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Radius System</h1>
          <p className="text-muted-foreground">
            No radius tokens found. Please import a Tokens Studio JSON file with radius tokens.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Radius System</h1>
        <p className="text-muted-foreground text-lg">
          Border radius tokens define the curvature of corners for components and elements.
          These tokens create visual consistency and hierarchy throughout the interface.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Visual Preview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {radiusTokens.map((token) => (
            <Card key={token.name} className="p-6">
              <div className="flex flex-col gap-4 items-center">
                <div
                  className="w-24 h-24 bg-primary flex items-center justify-center"
                  style={{
                    borderRadius: Array.isArray(token.value) 
                      ? token.value.join(' ') 
                      : String(token.value),
                  }}
                >
                  <span className="text-primary-foreground text-xs font-medium">
                    {Array.isArray(token.value) 
                      ? token.value.join(' ') 
                      : String(token.value)}
                  </span>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium">{formatTokenDisplayName(token.name)}</div>
                  <div className="text-xs text-muted-foreground font-mono mt-1">
                    {Array.isArray(token.value) 
                      ? token.value.join(' ') 
                      : String(token.value)}
                  </div>
                  <div className="text-xs text-muted-foreground font-mono mt-0.5 opacity-60">
                    {token.name}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Multi-value Radius Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="text-sm font-medium">Custom Radius (4px 8px)</div>
              <div
                className="w-full h-20 bg-primary"
                style={{ borderRadius: '4px 8px' }}
              />
            </div>
          </Card>
          <Card className="p-6">
            <div className="space-y-4">
              <div className="text-sm font-medium">Asymmetric (8px 4px 8px 4px)</div>
              <div
                className="w-full h-20 bg-primary"
                style={{ borderRadius: '8px 4px 8px 4px' }}
              />
            </div>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Token Table</h2>
        <TokenTable tokens={radiusTokens} />
      </div>
    </div>
  )
}
