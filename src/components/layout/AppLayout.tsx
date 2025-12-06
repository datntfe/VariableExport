import * as React from 'react'
import { Header, HEADER_HEIGHT_PX } from './Header'
import { Sidebar, SIDEBAR_WIDTH_PX } from './Sidebar'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Sidebar as MobileSidebar } from './Sidebar'
import { cn } from '@/lib/utils'
import { Outlet } from 'react-router-dom'

export interface AppLayoutProps {
  children?: React.ReactNode
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setMobileMenuOpen(true)} />

      <Sidebar />

      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-[260px] p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <MobileSidebar
            className="relative top-0 block border-r-0"
            onItemClick={() => setMobileMenuOpen(false)}
          />
        </SheetContent>
      </Sheet>

      <main
        className={cn(
          'bg-background text-foreground transition-all',
          'lg:ml-[260px]'
        )}
        style={{
          marginTop: `${HEADER_HEIGHT_PX}px`,
          minHeight: `calc(100vh - ${HEADER_HEIGHT_PX}px)`,
        }}
      >
        <div className="p-6">
          {children || <Outlet />}
        </div>
      </main>
    </div>
  )
}
