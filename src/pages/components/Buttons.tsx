import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { TokenTable } from '@/components/system/TokenTable'
import { mockTokens } from '@/lib/tokens'

export const Buttons: React.FC = () => {
  const buttonTokens = mockTokens.filter(t => 
    t.category === 'color' || t.category === 'radius' || t.category === 'spacing'
  )

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Buttons</h1>
        <p className="text-muted-foreground text-lg">
          Button components provide interactive elements for user actions.
          They use design tokens for consistent styling across variants and states.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Variants</h2>
        <Card className="p-6">
          <div className="flex flex-wrap gap-4">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Sizes</h2>
        <Card className="p-6">
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">🚀</Button>
          </div>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">States</h2>
        <Card className="p-6">
          <div className="flex flex-wrap gap-4">
            <Button>Normal</Button>
            <Button disabled>Disabled</Button>
            <Button className="cursor-wait">Loading</Button>
          </div>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Token Mapping</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Button Tokens</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Buttons use tokens from multiple categories: colors (background, foreground),
              radius (border-radius), spacing (padding), and typography (font-size, font-weight).
            </p>
            <TokenTable tokens={buttonTokens.slice(0, 10)} />
          </div>
        </div>
      </div>
    </div>
  )
}

