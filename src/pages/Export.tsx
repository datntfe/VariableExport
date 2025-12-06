import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Download } from 'lucide-react'
import { useTokenStore } from '@/lib/token-store'
import { getAllCategories, getTokensByCategory, getTotalTokenCount } from '@/lib/token-helpers'

export const Export: React.FC = () => {
  const { rawTokens, designTokens } = useTokenStore()

  const exportJSON = () => {
    if (!rawTokens) return
    
    const dataStr = JSON.stringify(rawTokens, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'design-tokens.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  const exportParsedJSON = () => {
    if (!designTokens) return
    
    const dataStr = JSON.stringify(designTokens, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'parsed-design-tokens.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  const exportTailwindConfig = () => {
    if (!designTokens) return

    const config: any = {
      theme: {
        extend: {
          colors: {},
          borderRadius: {},
          spacing: {},
        },
      },
    }

    // Add radius tokens
    Object.entries(designTokens.radius).forEach(([key, token]) => {
      const name = key.split('.').pop() || key
      config.theme.extend.borderRadius[name] = token.value
    })

    // Add spacing tokens
    Object.entries(designTokens.spacing).forEach(([key, token]) => {
      const name = key.split('.').pop() || key
      config.theme.extend.spacing[name] = token.value
    })

    const dataStr = `module.exports = ${JSON.stringify(config, null, 2)}`
    const dataBlob = new Blob([dataStr], { type: 'text/javascript' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'tailwind.config.js'
    link.click()
    URL.revokeObjectURL(url)
  }

  const exportCSSVariables = () => {
    if (!designTokens) return

    let css = ':root {\n'
    
    // Add all tokens as CSS variables
    const allTokens = [
      ...Object.values(designTokens.borders),
      ...Object.values(designTokens.radius),
      ...Object.values(designTokens.icons),
      ...Object.values(designTokens.spacing),
      ...Object.values(designTokens.colors),
      ...Object.values(designTokens.appearance.light),
      ...Object.values(designTokens.appearance.dark),
      ...Object.values(designTokens.typography),
    ]

    allTokens.forEach(token => {
      const varName = `--${token.name.replace(/\./g, '-')}`
      css += `  ${varName}: ${token.value};\n`
    })
    
    css += '}\n'
    const dataBlob = new Blob([css], { type: 'text/css' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'tokens.css'
    link.click()
    URL.revokeObjectURL(url)
  }

  if (!designTokens) {
    return (
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Export Tokens</h1>
          <p className="text-muted-foreground">
            No tokens loaded. Please import a Tokens Studio JSON file first.
          </p>
        </div>
      </div>
    )
  }

  const categories = getAllCategories(designTokens)
  const tokenCountByCategory = categories.reduce((acc, cat) => {
    acc[cat] = getTokensByCategory(designTokens, cat).length
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Export Tokens</h1>
        <p className="text-muted-foreground text-lg">
          Export design tokens in various formats for use in your projects.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Export Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Original JSON</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Export the original Tokens Studio JSON file.
                </p>
              </div>
              <Button onClick={exportJSON} className="w-full" disabled={!rawTokens}>
                <Download className="mr-2 h-4 w-4" />
                Export Original JSON
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Parsed JSON</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Export parsed tokens as structured JSON.
                </p>
              </div>
              <Button onClick={exportParsedJSON} className="w-full" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Parsed JSON
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Tailwind Config</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Export as Tailwind CSS configuration file.
                </p>
              </div>
              <Button onClick={exportTailwindConfig} className="w-full" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Tailwind Config
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">CSS Variables</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Export as CSS custom properties (variables).
                </p>
              </div>
              <Button onClick={exportCSSVariables} className="w-full" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export CSS Variables
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Token Count by Category</h2>
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map(category => (
              <div key={category} className="flex items-center justify-between p-3 border rounded-md">
                <span className="font-medium capitalize">{category}</span>
                <span className="text-sm text-muted-foreground">
                  {tokenCountByCategory[category]} tokens
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
