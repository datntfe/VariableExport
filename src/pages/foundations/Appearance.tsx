import * as React from 'react'
import { Card } from '@/components/ui/card'
import { getTokensByGroup } from '@/lib/tokens'

export const Appearance: React.FC = () => {
  const semanticColors = getTokensByGroup('semantic')
  const lightColors = semanticColors.filter(t => t.mode === 'light')
  const darkColors = semanticColors.filter(t => t.mode === 'dark')

  const getColorValue = (name: string, mode: string) => {
    return semanticColors.find(t => t.name === name && t.mode === mode)?.value || '#000000'
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
          <Card className="p-6" style={{ backgroundColor: getColorValue('color.semantic.background', 'light') }}>
            <div className="space-y-4">
              <div className="text-lg font-semibold" style={{ color: getColorValue('color.semantic.foreground', 'light') }}>
                Light Mode
              </div>
              <div className="space-y-2">
                <div className="text-sm" style={{ color: getColorValue('color.semantic.foreground', 'light') }}>
                  Background: {String(getColorValue('color.semantic.background', 'light'))}
                </div>
                <div className="text-sm" style={{ color: getColorValue('color.semantic.foreground', 'light') }}>
                  Foreground: {String(getColorValue('color.semantic.foreground', 'light'))}
                </div>
                <div
                  className="p-3 rounded-md"
                  style={{
                    backgroundColor: getColorValue('color.semantic.primary', 'light'),
                    color: '#ffffff',
                  }}
                >
                  Primary Color
                </div>
                <div
                  className="p-3 rounded-md"
                  style={{
                    backgroundColor: getColorValue('color.semantic.muted', 'light'),
                    color: getColorValue('color.semantic.foreground', 'light'),
                  }}
                >
                  Muted Background
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6" style={{ backgroundColor: getColorValue('color.semantic.background', 'dark') }}>
            <div className="space-y-4">
              <div className="text-lg font-semibold" style={{ color: getColorValue('color.semantic.foreground', 'dark') }}>
                Dark Mode
              </div>
              <div className="space-y-2">
                <div className="text-sm" style={{ color: getColorValue('color.semantic.foreground', 'dark') }}>
                  Background: {String(getColorValue('color.semantic.background', 'dark'))}
                </div>
                <div className="text-sm" style={{ color: getColorValue('color.semantic.foreground', 'dark') }}>
                  Foreground: {String(getColorValue('color.semantic.foreground', 'dark'))}
                </div>
                <div
                  className="p-3 rounded-md"
                  style={{
                    backgroundColor: getColorValue('color.semantic.primary', 'dark'),
                    color: '#000000',
                  }}
                >
                  Primary Color
                </div>
                <div
                  className="p-3 rounded-md"
                  style={{
                    backgroundColor: getColorValue('color.semantic.muted', 'dark'),
                    color: getColorValue('color.semantic.foreground', 'dark'),
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

