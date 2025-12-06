import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const Theming: React.FC = () => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light')

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Theming</h1>
        <p className="text-muted-foreground text-lg">
          The theming system allows you to customize the appearance of the design system
          through tokens that control colors, radius, scale, and accent colors.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Theme Switcher</h2>
        <div className="flex gap-4 mb-6">
          <Button
            variant={theme === 'light' ? 'default' : 'outline'}
            onClick={() => setTheme('light')}
          >
            Light Theme
          </Button>
          <Button
            variant={theme === 'dark' ? 'default' : 'outline'}
            onClick={() => setTheme('dark')}
          >
            Dark Theme
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Theme Preview</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="text-lg font-semibold">Light Theme</div>
              <div className="space-y-2">
                <div className="p-4 bg-background border border-border rounded-md">
                  <div className="text-foreground">Background & Foreground</div>
                </div>
                <div className="p-4 bg-primary text-primary-foreground rounded-md">
                  Primary Color
                </div>
                <div className="p-4 bg-secondary text-secondary-foreground rounded-md">
                  Secondary Color
                </div>
                <div className="p-4 bg-muted text-muted-foreground rounded-md">
                  Muted Color
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-[#1a1a1a] border-[#333]">
            <div className="space-y-4">
              <div className="text-lg font-semibold text-white">Dark Theme</div>
              <div className="space-y-2">
                <div className="p-4 bg-[#0a0a0a] border border-[#333] rounded-md">
                  <div className="text-white">Background & Foreground</div>
                </div>
                <div className="p-4 bg-white text-black rounded-md">
                  Primary Color
                </div>
                <div className="p-4 bg-[#2a2a2a] text-white rounded-md">
                  Secondary Color
                </div>
                <div className="p-4 bg-[#1a1a1a] text-gray-400 rounded-md">
                  Muted Color
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Radius Variations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['0.25rem', '0.5rem', '0.75rem'].map((radius) => (
            <Card key={radius} className="p-6">
              <div className="space-y-2">
                <div className="text-sm font-medium">Radius: {radius}</div>
                <div
                  className="w-full h-20 bg-primary"
                  style={{ borderRadius: radius }}
                />
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Scale Variations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['100%', '110%', '120%'].map((scale) => (
            <Card key={scale} className="p-6">
              <div className="space-y-2">
                <div className="text-sm font-medium">Scale: {scale}</div>
                <div style={{ transform: `scale(${parseInt(scale) / 100})`, transformOrigin: 'top left' }}>
                  <Button>Sample Button</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

