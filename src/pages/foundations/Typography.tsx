import * as React from 'react'
import { getTokensByCategory } from '@/lib/tokens'
import { TokenTable } from '@/components/system/TokenTable'
import { Card } from '@/components/ui/card'

export const Typography: React.FC = () => {
  const typographyTokens = getTokensByCategory('typography')
  const fontSizes = typographyTokens.filter(t => t.group === 'font-size')
  const fontWeights = typographyTokens.filter(t => t.group === 'font-weight')
  const lineHeights = typographyTokens.filter(t => t.group === 'line-height')
  const fontFamily = typographyTokens.find(t => t.group === 'font-family')

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Typography System</h1>
        <p className="text-muted-foreground text-lg">
          The typography system establishes a clear hierarchy, ensures readability,
          and maintains consistent rhythm throughout the interface.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Font Family</h2>
        <Card className="p-6">
          <div className="space-y-2">
            <div className="text-sm font-medium">Font Family Token</div>
            <div className="text-lg font-mono">{fontFamily?.value || 'system-ui, sans-serif'}</div>
            <div className="text-2xl" style={{ fontFamily: String(fontFamily?.value || 'system-ui, sans-serif') }}>
              Sample Text: The quick brown fox jumps over the lazy dog
            </div>
          </div>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Font Sizes</h2>
        <Card className="p-6">
          <div className="space-y-4">
            {fontSizes.map((token) => (
              <div key={token.name} className="space-y-2">
                <div className="text-sm font-medium font-mono">{token.name}</div>
                <div style={{ fontSize: token.value }}>
                  The quick brown fox jumps over the lazy dog ({String(token.value)})
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Font Weights</h2>
        <Card className="p-6">
          <div className="space-y-4">
            {fontWeights.map((token) => (
              <div key={token.name} className="space-y-2">
                <div className="text-sm font-medium font-mono">{token.name} ({token.value})</div>
                <div style={{ fontWeight: Number(token.value) }}>
                  The quick brown fox jumps over the lazy dog
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Line Heights</h2>
        <Card className="p-6">
          <div className="space-y-4">
            {lineHeights.map((token) => (
              <div key={token.name} className="space-y-2">
                <div className="text-sm font-medium font-mono">{token.name} ({token.value})</div>
                <div style={{ lineHeight: token.value, maxWidth: '400px' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris.
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Heading Hierarchy</h2>
        <Card className="p-6">
          <div className="space-y-4">
            <h1 style={{ fontSize: '2.25rem', fontWeight: 700, lineHeight: 1.25 }}>
              Heading 1 (H1) - Bold
            </h1>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 400, lineHeight: 1.25 }}>
              Heading 1 (H1) - Regular
            </h1>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 600, lineHeight: 1.25 }}>
              Heading 2 (H2) - Semibold
            </h2>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.25 }}>
              Heading 3 (H3) - Semibold
            </h3>
            <p style={{ fontSize: '1rem', fontWeight: 400, lineHeight: 1.5 }}>
              Body text - Regular weight, normal line height for optimal readability.
            </p>
          </div>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Token Table</h2>
        <TokenTable tokens={typographyTokens} />
      </div>
    </div>
  )
}

