import * as React from 'react'
import { TokenTable } from '@/components/system/TokenTable'
import { Card } from '@/components/ui/card'
import { useTokenStore } from '@/lib/token-store'
import { getTokensByCategory, formatTokenDisplayName } from '@/lib/token-helpers'

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
        <h2 className="text-2xl font-semibold mb-4">Visual Scale Preview</h2>
        <div className="space-y-4">
          {(() => {
            // Calculate max value for scaling
            const maxValue = Math.max(...spacingTokens.map(t => {
              const v = Array.isArray(t.value) ? t.value[0] : String(t.value)
              return parseFloat(v.replace(/[^\d.-]/g, '')) || 0
            }))
            const scaleFactor = maxValue > 0 ? Math.min(600 / maxValue, 15) : 1
            
            return spacingTokens.map((token) => {
              const valueStr = Array.isArray(token.value) 
                ? token.value[0] 
                : String(token.value)
              const numericValue = parseFloat(valueStr.replace(/[^\d.-]/g, '')) || 0
              const displayWidth = numericValue * scaleFactor
              
              return (
                <Card key={token.name} className="p-4">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium">{formatTokenDisplayName(token.name)}</div>
                        <div className="text-xs text-muted-foreground font-mono">{token.name}</div>
                      </div>
                      <div className="text-sm font-mono text-muted-foreground">
                        {Array.isArray(token.value) 
                          ? token.value.join(' ') 
                          : String(token.value)}
                      </div>
                    </div>
                    <div className="relative w-full bg-muted/50 rounded-md p-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="bg-primary h-10 rounded flex items-center justify-center transition-all shrink-0"
                          style={{ 
                            width: `${Math.max(displayWidth, 20)}px`,
                            minWidth: '20px',
                          }}
                        >
                          <span className="text-primary-foreground text-xs font-medium px-2 whitespace-nowrap">
                            {numericValue}px
                          </span>
                        </div>
                        <div className="flex-1 h-1 bg-border rounded-full relative">
                          <div 
                            className="absolute top-0 left-0 h-full bg-primary/30 rounded-full"
                            style={{ width: `${(numericValue / maxValue) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })
          })()}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Stack Preview (Vertical Spacing)</h2>
        <Card className="p-6">
          <div className="space-y-4">
            {spacingTokens.slice(0, 5).map((token) => {
              const valueStr = Array.isArray(token.value) 
                ? token.value[0] 
                : String(token.value)
              const numericValue = parseFloat(valueStr.replace(/[^\d.-]/g, '')) || 0
              
              return (
                <div key={token.name} className="flex items-center gap-4">
                  <div className="flex flex-col w-32">
                    <div className="text-sm font-medium">{formatTokenDisplayName(token.name)}</div>
                    <div className="text-xs text-muted-foreground font-mono">{token.name}</div>
                  </div>
                  <div className="flex-1 flex items-center gap-2">
                    <div
                      className="bg-muted h-12 rounded-md flex items-center justify-center border-2 border-dashed border-border"
                      style={{ 
                        width: '100%',
                        paddingLeft: valueStr,
                        paddingRight: valueStr,
                      }}
                    >
                      <span className="text-xs text-muted-foreground">
                        Padding: {valueStr} (left & right)
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
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
