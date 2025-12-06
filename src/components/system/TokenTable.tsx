import * as React from 'react'
import { DesignToken } from '@/lib/tokens'
import { cn } from '@/lib/utils'

export interface TokenTableProps {
  tokens: DesignToken[]
  className?: string
}

export const TokenTable: React.FC<TokenTableProps> = ({
  tokens,
  className,
}) => {
  if (tokens.length === 0) {
    return (
      <div className={cn('rounded-md border border-border p-4 text-center text-muted-foreground', className)}>
        No tokens found
      </div>
    )
  }

  return (
    <div className={cn('overflow-x-auto rounded-md border border-border', className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="px-4 py-3 text-left text-sm font-medium">Token Name</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Category</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Group</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Value</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Mode</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, index) => (
            <tr
              key={`${token.name}-${index}`}
              className="border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors"
            >
              <td className="px-4 py-3 text-sm font-mono">{token.name}</td>
              <td className="px-4 py-3 text-sm">{token.category}</td>
              <td className="px-4 py-3 text-sm">{token.group}</td>
              <td className="px-4 py-3 text-sm">{token.type}</td>
              <td className="px-4 py-3 text-sm font-mono">{String(token.value)}</td>
              <td className="px-4 py-3 text-sm">{token.mode || 'default'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
