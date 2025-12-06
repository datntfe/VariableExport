import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { TokenTable } from '@/components/system/TokenTable'
import { mockTokens } from '@/lib/tokens'

export const Inputs: React.FC = () => {
  const inputTokens = mockTokens.filter(t => 
    t.category === 'color' || t.category === 'radius' || t.category === 'spacing' || t.category === 'border'
  )

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
            <TokenTable tokens={inputTokens.slice(0, 10)} />
          </div>
        </div>
      </div>
    </div>
  )
}

