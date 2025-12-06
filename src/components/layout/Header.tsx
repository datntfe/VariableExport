import * as React from 'react'
import { Menu, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { useTheme } from '@/lib/theme-context'
import { useTokenStore } from '@/lib/token-store'

export interface HeaderProps {
  onMenuClick?: () => void
}

const HEADER_HEIGHT = 64

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { theme, setBrand, setMode } = useTheme()
  const { availableBrands } = useTokenStore()
  
  // Use available brands from tokens, fallback to default
  const BRANDS = availableBrands.length > 0 
    ? availableBrands.map(b => b.charAt(0).toUpperCase() + b.slice(1).toLowerCase())
    : ['Default']

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b bg-background px-4'
      )}
      style={{ height: `${HEADER_HEIGHT}px` }}
    >
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">Storybook — Multi-Brand</h1>
      </div>

      <div className="flex items-center gap-2">
        {/* Brand Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Brand: {theme.brand}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Brand</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {BRANDS.map((brand) => {
              const brandKey = brand.toLowerCase()
              const isSelected = theme.brand.toLowerCase() === brandKey
              return (
                <DropdownMenuItem
                  key={brand}
                  onClick={() => setBrand(brand)}
                  className="flex items-center justify-between"
                >
                  <span>{brand}</span>
                  {isSelected && (
                    <Check className="ml-2 h-4 w-4" />
                  )}
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Mode Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Mode: {theme.mode === 'system' ? 'System' : theme.mode.charAt(0).toUpperCase() + theme.mode.slice(1)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setMode('light')}
              className="flex items-center justify-between"
            >
              <span>Light</span>
              {theme.mode === 'light' && (
                <Check className="ml-2 h-4 w-4" />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setMode('dark')}
              className="flex items-center justify-between"
            >
              <span>Dark</span>
              {theme.mode === 'dark' && (
                <Check className="ml-2 h-4 w-4" />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setMode('system')}
              className="flex items-center justify-between"
            >
              <span>System</span>
              {theme.mode === 'system' && (
                <Check className="ml-2 h-4 w-4" />
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export const HEADER_HEIGHT_PX = HEADER_HEIGHT
