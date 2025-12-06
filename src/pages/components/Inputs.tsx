import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { TokenTable } from '@/components/system/TokenTable'
import { useTokenStore } from '@/lib/token-store'
import { getTokensByCategory } from '@/lib/token-helpers'

export const Inputs: React.FC = () => {
  const { designTokens } = useTokenStore()
  
  const inputTokens = React.useMemo(() => {
    if (!designTokens) return []
    return [
      ...getTokensByCategory(designTokens, 'color'),
      ...getTokensByCategory(designTokens, 'radius'),
      ...getTokensByCategory(designTokens, 'spacing'),
      ...getTokensByCategory(designTokens, 'border'),
    ].slice(0, 15)
  }, [designTokens])

  if (!designTokens) {
    return (
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Inputs</h1>
          <p className="text-muted-foreground">
            No tokens loaded. Please import a Tokens Studio JSON file first.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Inputs</h1>
        <p className="text-muted-foreground text-lg">
          Input components allow users to enter and edit text.
          They use design tokens for border, radius, spacing, and typography.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Input States</h2>
        <Card className="p-6">
          <div className="space-y-4 max-w-md">
            <div>
              <label className="text-sm font-medium mb-2 block">Normal</label>
              <Input placeholder="Enter text..." />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Disabled</label>
              <Input placeholder="Disabled input" disabled />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">With Value</label>
              <Input value="Sample text" readOnly />
            </div>
          </div>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Token Mapping</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Input Tokens</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Inputs use tokens for border width, border color, border-radius, padding, and typography.
            </p>
            <TokenTable tokens={inputTokens} />
          </div>
        </div>
      </div>
    </div>
  )
}
