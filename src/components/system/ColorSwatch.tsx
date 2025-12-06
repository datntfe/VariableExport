import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ColorSwatchProps {
  name: string
  value: string
  mode?: string
  className?: string
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({
  name,
  value,
  mode,
  className,
}) => {
  // Convert HSL to RGB for display if needed
  const getDisplayValue = (val: string): string => {
    if (val.startsWith('hsl')) {
      return val
    }
    return val
  }

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div
        className="h-20 w-full rounded-md border border-border shadow-sm"
        style={{ backgroundColor: getDisplayValue(value) }}
      />
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-xs text-muted-foreground font-mono">{value}</span>
        {mode && (
          <span className="text-xs text-muted-foreground">Mode: {mode}</span>
        )}
      </div>
    </div>
  )
}
