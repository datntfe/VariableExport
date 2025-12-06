import * as React from 'react'
import {
  Home,
  Square,
  Circle,
  Shapes,
  Ruler,
  Palette,
  Type,
  Sun,
  Moon,
  Download,
  Layout,
  MousePointerClick,
  FileText,
} from 'lucide-react'
import { NavigationItem } from './NavigationItem'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { useLocation, useNavigate } from 'react-router-dom'

export interface SidebarProps {
  className?: string
  onItemClick?: (path: string) => void
}

const SIDEBAR_WIDTH = 260

export const Sidebar: React.FC<SidebarProps> = ({
  className,
  onItemClick,
}) => {
  const location = useLocation()
  const navigate = useNavigate()

  const handleItemClick = (path: string) => {
    navigate(path)
    onItemClick?.(path)
  }

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <aside
      className={cn(
        'fixed left-0 top-16 bottom-0 hidden w-[260px] overflow-y-auto border-r bg-muted/20 py-4 lg:block',
        className
      )}
      style={{ width: `${SIDEBAR_WIDTH}px`, top: '64px' }}
    >
      <nav className="space-y-2 px-3">
        <div className="space-y-1">
          <p className="px-3 text-xs font-semibold uppercase text-muted-foreground">
            HOME
          </p>
          <NavigationItem
            icon={Home}
            label="Overview"
            active={isActive('/')}
            onClick={() => handleItemClick('/')}
          />
        </div>

        <Separator className="my-4" />

        <div className="space-y-1">
          <p className="px-3 text-xs font-semibold uppercase text-muted-foreground">
            FOUNDATIONS
          </p>
          <NavigationItem
            icon={Square}
            label="Borders"
            active={isActive('/foundations/borders')}
            onClick={() => handleItemClick('/foundations/borders')}
          />
          <NavigationItem
            icon={Circle}
            label="Radius System"
            active={isActive('/foundations/radius')}
            onClick={() => handleItemClick('/foundations/radius')}
          />
          <NavigationItem
            icon={Shapes}
            label="Icon System"
            active={isActive('/foundations/icons')}
            onClick={() => handleItemClick('/foundations/icons')}
          />
          <NavigationItem
            icon={Ruler}
            label="Spacing Scale"
            active={isActive('/foundations/spacing')}
            onClick={() => handleItemClick('/foundations/spacing')}
          />
          <NavigationItem
            icon={Palette}
            label="Colors"
            active={isActive('/foundations/colors')}
            onClick={() => handleItemClick('/foundations/colors')}
          />
          <NavigationItem
            icon={Sun}
            label="Appearance"
            active={isActive('/foundations/appearance')}
            onClick={() => handleItemClick('/foundations/appearance')}
          />
          <NavigationItem
            icon={Type}
            label="Typography System"
            active={isActive('/foundations/typography')}
            onClick={() => handleItemClick('/foundations/typography')}
          />
        </div>

        <Separator className="my-4" />

        <div className="space-y-1">
          <p className="px-3 text-xs font-semibold uppercase text-muted-foreground">
            THEMING
          </p>
          <NavigationItem
            icon={Moon}
            label="Light & Dark Theme"
            active={isActive('/theming')}
            onClick={() => handleItemClick('/theming')}
          />
        </div>

        <Separator className="my-4" />

        <div className="space-y-1">
          <p className="px-3 text-xs font-semibold uppercase text-muted-foreground">
            COMPONENTS
          </p>
          <NavigationItem
            icon={MousePointerClick}
            label="Buttons"
            active={isActive('/components/buttons')}
            onClick={() => handleItemClick('/components/buttons')}
          />
          <NavigationItem
            icon={Layout}
            label="Cards"
            active={isActive('/components/cards')}
            onClick={() => handleItemClick('/components/cards')}
          />
          <NavigationItem
            icon={FileText}
            label="Inputs"
            active={isActive('/components/inputs')}
            onClick={() => handleItemClick('/components/inputs')}
          />
        </div>

        <Separator className="my-4" />

        <div className="space-y-1">
          <p className="px-3 text-xs font-semibold uppercase text-muted-foreground">
            EXPORT
          </p>
          <NavigationItem
            icon={Download}
            label="Export Tokens"
            active={isActive('/export')}
            onClick={() => handleItemClick('/export')}
          />
        </div>
      </nav>
    </aside>
  )
}

export const SIDEBAR_WIDTH_PX = SIDEBAR_WIDTH
