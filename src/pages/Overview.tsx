import * as React from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { useTokenStore } from '@/lib/token-store'
import {
  getTokensByCategory,
  getAllCategories,
  getAllModes,
  getTotalTokenCount,
  getTokensAsArray,
} from '@/lib/token-helpers'

export const Overview: React.FC = () => {
  const { designTokens } = useTokenStore()
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all')
  const [selectedMode, setSelectedMode] = React.useState<string>('all')

  const categories = getAllCategories(designTokens)
  const modes = getAllModes(designTokens)

  // Get all tokens as array
  const allTokens = React.useMemo(() => {
    if (!designTokens) return []
    return [
      ...getTokensAsArray(designTokens.borders),
      ...getTokensAsArray(designTokens.radius),
      ...getTokensAsArray(designTokens.icons),
      ...getTokensAsArray(designTokens.spacing),
      ...getTokensAsArray(designTokens.colors),
      ...getTokensAsArray(designTokens.appearance.light),
      ...getTokensAsArray(designTokens.appearance.dark),
      ...getTokensAsArray(designTokens.typography),
    ]
  }, [designTokens])

  const filteredTokens = allTokens.filter(token => {
    const matchesSearch = token.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || token.category === selectedCategory
    const matchesMode = selectedMode === 'all' || (token.mode || 'default') === selectedMode
    return matchesSearch && matchesCategory && matchesMode
  })

  const tokenCountByCategory = categories.reduce((acc, cat) => {
    acc[cat] = getTokensByCategory(designTokens, cat).length
    return acc
  }, {} as Record<string, number>)

  const totalTokens = getTotalTokenCount(designTokens)

  if (!designTokens) {
    return (
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Design System Overview</h1>
          <p className="text-muted-foreground text-lg">
            No tokens loaded. Please import a Tokens Studio JSON file.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Design System Overview</h1>
        <p className="text-muted-foreground text-lg">
          A comprehensive design token system for building consistent, scalable user interfaces.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="text-3xl font-bold mb-1">{totalTokens}</div>
          <div className="text-sm text-muted-foreground">Total Tokens</div>
        </Card>
        <Card className="p-6">
          <div className="text-3xl font-bold mb-1">{modes.length}</div>
          <div className="text-sm text-muted-foreground">Supported Modes</div>
        </Card>
        <Card className="p-6">
          <div className="text-3xl font-bold mb-1">2</div>
          <div className="text-sm text-muted-foreground">Supported Brands</div>
        </Card>
        <Card className="p-6">
          <div className="text-3xl font-bold mb-1">{categories.length}</div>
          <div className="text-sm text-muted-foreground">Token Categories</div>
        </Card>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tokens by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 rounded-md border border-input bg-background"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={selectedMode}
            onChange={(e) => setSelectedMode(e.target.value)}
            className="px-4 py-2 rounded-md border border-input bg-background"
          >
            <option value="all">All Modes</option>
            {modes.map(mode => (
              <option key={mode} value={mode}>{mode}</option>
            ))}
          </select>
        </div>

        <div className="text-sm text-muted-foreground">
          Showing {filteredTokens.length} of {totalTokens} tokens
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Token Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(category => (
            <Card key={category} className="p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium capitalize">{category}</span>
                <span className="text-sm text-muted-foreground">
                  {tokenCountByCategory[category]} tokens
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
