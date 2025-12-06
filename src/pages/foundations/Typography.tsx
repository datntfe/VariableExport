import * as React from 'react'
import { TokenTable } from '@/components/system/TokenTable'
import { Card } from '@/components/ui/card'
import { useTokenStore } from '@/lib/token-store'
import { getTokensByCategory, getTokensByGroup } from '@/lib/token-helpers'

export const Typography: React.FC = () => {
  const { designTokens } = useTokenStore()
  const typographyTokens = getTokensByCategory(designTokens, 'typography')
  const fontSizes = getTokensByGroup(designTokens, 'font-size')
  const fontWeights = getTokensByGroup(designTokens, 'font-weight')
  const lineHeights = getTokensByGroup(designTokens, 'line-height')
  const fontFamilies = getTokensByGroup(designTokens, 'font-family')
  const letterSpacing = getTokensByGroup(designTokens, 'letter-spacing')
  const paragraphSpacing = getTokensByGroup(designTokens, 'paragraph-spacing')

  // Get typography styles from theme.typography if available
  const typographyStyles = React.useMemo(() => {
    if (!designTokens) return []
    return Object.entries(designTokens.typography || {})
      .filter(([key]) => key.startsWith('theme.typography.'))
      .map(([key, token]) => ({ key, token }))
  }, [designTokens])

  if (!designTokens || typographyTokens.length === 0) {
    return (
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Typography System</h1>
          <p className="text-muted-foreground">
            No typography tokens found. Please import a Tokens Studio JSON file with typography tokens.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Typography System</h1>
        <p className="text-muted-foreground text-lg">
          The typography system establishes a clear hierarchy, ensures readability,
          and maintains consistent rhythm throughout the interface.
        </p>
      </div>

      {fontFamilies.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Font Family</h2>
          <Card className="p-6">
            <div className="space-y-4">
              {fontFamilies.map((token) => (
                <div key={token.name} className="space-y-2">
                  <div className="text-sm font-medium font-mono">{token.name}</div>
                  <div className="text-lg font-mono">{String(token.value)}</div>
                  <div className="text-2xl" style={{ fontFamily: String(token.value) }}>
                    Sample Text: The quick brown fox jumps over the lazy dog
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {fontSizes.length > 0 && (
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
      )}

      {fontWeights.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Font Weights</h2>
          <Card className="p-6">
            <div className="space-y-4">
              {fontWeights.map((token) => {
                const weightValue = token.value === 'Regular' ? 400 : 
                                  token.value === 'Bold' ? 700 : 
                                  Number(token.value) || 400
                return (
                  <div key={token.name} className="space-y-2">
                    <div className="text-sm font-medium font-mono">{token.name} ({String(token.value)})</div>
                    <div style={{ fontWeight: weightValue }}>
                      The quick brown fox jumps over the lazy dog
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>
      )}

      {lineHeights.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Line Heights</h2>
          <Card className="p-6">
            <div className="space-y-4">
              {lineHeights.map((token) => (
                <div key={token.name} className="space-y-2">
                  <div className="text-sm font-medium font-mono">{token.name} ({String(token.value)})</div>
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
      )}

      {letterSpacing.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Letter Spacing</h2>
          <Card className="p-6">
            <div className="space-y-4">
              {letterSpacing.map((token) => (
                <div key={token.name} className="space-y-2">
                  <div className="text-sm font-medium font-mono">{token.name} ({String(token.value)})</div>
                  <div style={{ letterSpacing: token.value }}>
                    The quick brown fox jumps over the lazy dog
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {typographyStyles.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Typography Styles</h2>
          <Card className="p-6">
            <div className="space-y-6">
              {typographyStyles.map(({ key, token }) => {
                const styleName = key.replace('theme.typography.', '')
                const styleTokens = Object.values(designTokens?.typography || {})
                  .filter(t => t.name.startsWith(key))
                
                const fontFamily = styleTokens.find(t => t.group === 'font-family')?.value || 'inherit'
                const fontSize = styleTokens.find(t => t.group === 'font-size')?.value || '1rem'
                const fontWeight = styleTokens.find(t => t.group === 'font-weight')?.value || '400'
                const lineHeight = styleTokens.find(t => t.group === 'line-height')?.value || '1.5'
                const letterSpacing = styleTokens.find(t => t.group === 'letter-spacing')?.value || '0'
                
                const weightValue = fontWeight === 'Regular' ? 400 : 
                                  fontWeight === 'Bold' ? 700 : 
                                  Number(fontWeight) || 400

                return (
                  <div key={key} className="space-y-2">
                    <div className="text-sm font-medium font-mono">{styleName}</div>
                    <div style={{
                      fontFamily: String(fontFamily),
                      fontSize: String(fontSize),
                      fontWeight: weightValue,
                      lineHeight: String(lineHeight),
                      letterSpacing: String(letterSpacing),
                    }}>
                      The quick brown fox jumps over the lazy dog
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-semibold mb-4">Token Table</h2>
        <TokenTable tokens={typographyTokens} />
      </div>
    </div>
  )
}
