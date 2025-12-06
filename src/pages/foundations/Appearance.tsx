import * as React from 'react'
import { Card } from '@/components/ui/card'
import { useTokenStore } from '@/lib/token-store'
import { getTokensByGroup } from '@/lib/token-helpers'

export const Appearance: React.FC = () => {
  const { designTokens } = useTokenStore()
  const semanticColors = getTokensByGroup(designTokens, 'semantic')
  const lightColors = semanticColors.filter(t => t.mode === 'light')
  const darkColors = semanticColors.filter(t => t.mode === 'dark')

  const getColorValue = (name: string, mode: string) => {
    return semanticColors.find(t => t.name === name && t.mode === mode)?.value || '#000000'
  }

  if (!designTokens) {
    return (
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Appearance Modes</h1>
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
        <h1 className="text-4xl font-bold mb-2">Appearance Modes</h1>
        <p className="text-muted-foreground text-lg">
          The design system supports both light and dark appearance modes.
          Semantic colors automatically adapt to ensure proper contrast and readability in each mode.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Light vs Dark Theme Comparison</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6" style={{ backgroundColor: getColorValue('light.bg.default', 'light') }}>
            <div className="space-y-4">
              <div className="text-lg font-semibold" style={{ color: getColorValue('light.fg.default', 'light') }}>
                Light Mode
              </div>
              <div className="space-y-2">
                <div className="text-sm" style={{ color: getColorValue('light.fg.default', 'light') }}>
                  Background: {String(getColorValue('light.bg.default', 'light'))}
                </div>
                <div className="text-sm" style={{ color: getColorValue('light.fg.default', 'light') }}>
                  Foreground: {String(getColorValue('light.fg.default', 'light'))}
                </div>
                <div
                  className="p-3 rounded-md"
                  style={{
                    backgroundColor: getColorValue('light.accent.default', 'light'),
                    color: getColorValue('light.accent.onAccent', 'light'),
                  }}
                >
                  Primary Color
                </div>
                <div
                  className="p-3 rounded-md"
                  style={{
                    backgroundColor: getColorValue('light.bg.muted', 'light'),
                    color: getColorValue('light.fg.default', 'light'),
                  }}
                >
                  Muted Background
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6" style={{ backgroundColor: getColorValue('dark.bg.default', 'dark') }}>
            <div className="space-y-4">
              <div className="text-lg font-semibold" style={{ color: getColorValue('dark.fg.default', 'dark') }}>
                Dark Mode
              </div>
              <div className="space-y-2">
                <div className="text-sm" style={{ color: getColorValue('dark.fg.default', 'dark') }}>
                  Background: {String(getColorValue('dark.bg.default', 'dark'))}
                </div>
                <div className="text-sm" style={{ color: getColorValue('dark.fg.default', 'dark') }}>
                  Foreground: {String(getColorValue('dark.fg.default', 'dark'))}
                </div>
                <div
                  className="p-3 rounded-md"
                  style={{
                    backgroundColor: getColorValue('dark.accent.default', 'dark'),
                    color: getColorValue('dark.accent.onAccent', 'dark'),
                  }}
                >
                  Primary Color
                </div>
                <div
                  className="p-3 rounded-md"
                  style={{
                    backgroundColor: getColorValue('dark.bg.muted', 'dark'),
                    color: getColorValue('dark.fg.default', 'dark'),
                  }}
                >
                  Muted Background
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Shadow Preview</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="text-sm font-medium mb-2">Light Mode Shadow</div>
            <div
              className="p-6 rounded-md"
              style={{
                backgroundColor: '#ffffff',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
              }}
            >
              Card with shadow
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-sm font-medium mb-2">Dark Mode Shadow</div>
            <div
              className="p-6 rounded-md"
              style={{
                backgroundColor: '#1a1a1a',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)',
              }}
            >
              Card with shadow
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
