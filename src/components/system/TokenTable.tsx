import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TokenTableProps extends React.HTMLAttributes<HTMLDivElement> {
  tokens: Record<string, string | number>
  title?: string
}

const TokenTable = React.forwardRef<HTMLDivElement, TokenTableProps>(
  ({ className, tokens, title, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {title && (
          <h3 className="mb-4 text-lg font-semibold">{title}</h3>
        )}
        <div className="overflow-x-auto rounded-md border border-border">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Token
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(tokens).map(([key, value]) => (
                <tr
                  key={key}
                  className="border-b border-border last:border-b-0 hover:bg-muted/50"
                >
                  <td className="px-4 py-3 text-sm font-mono">{key}</td>
                  <td className="px-4 py-3 text-sm">{String(value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
)
TokenTable.displayName = 'TokenTable'

export { TokenTable }

