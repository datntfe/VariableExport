import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { TokenStoreProvider, useTokenStore } from '@/lib/token-store'
import { ThemeProvider } from '@/lib/theme-context'
import { AppLayout } from '@/components/layout/AppLayout'
import { Import } from '@/pages/Import'
import { Overview } from '@/pages/Overview'
import { Borders } from '@/pages/foundations/Borders'
import { Radius } from '@/pages/foundations/Radius'
import { Icons } from '@/pages/foundations/Icons'
import { Spacing } from '@/pages/foundations/Spacing'
import { Colors } from '@/pages/foundations/Colors'
import { Appearance } from '@/pages/foundations/Appearance'
import { Typography } from '@/pages/foundations/Typography'
import { Theming } from '@/pages/Theming'
import { Buttons } from '@/pages/components/Buttons'
import { Cards } from '@/pages/components/Cards'
import { Inputs } from '@/pages/components/Inputs'
import { Export } from '@/pages/Export'

const ProtectedRoutes = () => {
  const { hasTokens } = useTokenStore()

  if (!hasTokens) {
    return <Navigate to="/import" replace />
  }

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Overview />} />
        <Route path="foundations/borders" element={<Borders />} />
        <Route path="foundations/radius" element={<Radius />} />
        <Route path="foundations/icons" element={<Icons />} />
        <Route path="foundations/spacing" element={<Spacing />} />
        <Route path="foundations/colors" element={<Colors />} />
        <Route path="foundations/appearance" element={<Appearance />} />
        <Route path="foundations/typography" element={<Typography />} />
        <Route path="theming" element={<Theming />} />
        <Route path="components/buttons" element={<Buttons />} />
        <Route path="components/cards" element={<Cards />} />
        <Route path="components/inputs" element={<Inputs />} />
        <Route path="export" element={<Export />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

function App() {
  return (
    <TokenStoreProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/import" element={<Import />} />
            <Route path="/*" element={<ProtectedRoutes />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </TokenStoreProvider>
  )
}

export default App
