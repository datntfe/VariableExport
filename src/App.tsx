import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Section spacing="lg">
        <Container>
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                VariableExport Project
              </h1>
              <p className="text-muted-foreground">
                Kiến trúc shadcn/ui đã được thiết lập và sẵn sàng cho tokens.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold">Button Variants</h2>
              <div className="flex flex-wrap gap-4">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold">Button Sizes</h2>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">🚀</Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}

export default App
