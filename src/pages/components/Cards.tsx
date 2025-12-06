import * as React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TokenTable } from '@/components/system/TokenTable'
import { useTokenStore } from '@/lib/token-store'
import { getTokensByCategory } from '@/lib/token-helpers'

export const Cards: React.FC = () => {
  const { designTokens } = useTokenStore()
  
  const cardTokens = React.useMemo(() => {
    if (!designTokens) return []
    return [
      ...getTokensByCategory(designTokens, 'color'),
      ...getTokensByCategory(designTokens, 'radius'),
      ...getTokensByCategory(designTokens, 'spacing'),
    ].slice(0, 15)
  }, [designTokens])

  if (!designTokens) {
    return (
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Cards</h1>
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
        <h1 className="text-4xl font-bold mb-2">Cards</h1>
        <p className="text-muted-foreground text-lg">
          Card components provide containers for grouping related content.
          They use design tokens for background, border-radius, shadow, and spacing.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Basic Card</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card description text</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card content goes here.</p>
            </CardContent>
            <CardFooter>
              <Button>Action</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card description text</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card content goes here.</p>
            </CardContent>
            <CardFooter>
              <Button>Action</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card description text</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card content goes here.</p>
            </CardContent>
            <CardFooter>
              <Button>Action</Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Token Mapping</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Card Tokens</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Cards use tokens for background color, border-radius, shadow, and internal spacing.
            </p>
            <TokenTable tokens={cardTokens} />
          </div>
        </div>
      </div>
    </div>
  )
}
