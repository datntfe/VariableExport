import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ColorSwatchProps extends React.HTMLAttributes<HTMLDivElement> {
  color: string
  name: string
  value?: string
}

const ColorSwatch = React.forwardRef<HTMLDivElement, ColorSwatchProps>(
  ({ className, color, name, value, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col gap-2', className)}
        {...props}
      >
        <div
          className="h-20 w-full rounded-md border border-border"
          style={{ backgroundColor: color }}
        />
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">{name}</span>
          {value && (
            <span className="text-xs text-muted-foreground">{value}</span>
          )}
        </div>
      </div>
    )
  }
)
ColorSwatch.displayName = 'ColorSwatch'

export { ColorSwatch }

