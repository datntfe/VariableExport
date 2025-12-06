import * as React from 'react'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface NavigationItemProps {
  icon?: LucideIcon
  label: string
  active?: boolean
  onClick?: () => void
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
  icon: Icon,
  label,
  active = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors',
        active
          ? 'bg-accent/20 text-accent-foreground'
          : 'hover:bg-accent/10 text-foreground'
      )}
    >
      {Icon && <Icon className="h-4 w-4" />}
      <span>{label}</span>
    </button>
  )
}

