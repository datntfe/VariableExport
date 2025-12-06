import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing = 'md', children, ...props }, ref) => {
    const spacingClasses = {
      xs: 'py-xs',
      sm: 'py-sm',
      md: 'py-md',
      lg: 'py-lg',
      xl: 'py-xl',
    }

    return (
      <section
        ref={ref}
        className={cn(spacingClasses[spacing], className)}
        {...props}
      >
        {children}
      </section>
    )
  }
)
Section.displayName = 'Section'

export { Section }

