import * as React from 'react'
import { Upload, FileJson, AlertCircle, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'
import { useTokenStore } from '@/lib/token-store'

export const Import: React.FC = () => {
  const [file, setFile] = React.useState<File | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [isProcessing, setIsProcessing] = React.useState(false)
  const navigate = useNavigate()
  const { setRawTokens, parseTokens } = useTokenStore()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.type !== 'application/json' && !selectedFile.name.endsWith('.json')) {
        setError('Please select a valid JSON file')
        return
      }
      setFile(selectedFile)
      setError(null)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      if (droppedFile.type !== 'application/json' && !droppedFile.name.endsWith('.json')) {
        setError('Please select a valid JSON file')
        return
      }
      setFile(droppedFile)
      setError(null)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const validateJSON = (json: any): boolean => {
    // Check if it's a valid Tokens Studio format
    if (typeof json !== 'object' || json === null) {
      return false
    }

    // Tokens Studio format typically has $themes or token sets
    // Check for common Tokens Studio structures
    const hasThemes = json.$themes || json.themes
    const hasTokens = json.tokens || json.$tokens
    const hasSets = json.sets || json.$sets

    return !!(hasThemes || hasTokens || hasSets)
  }

  const handleImport = async () => {
    if (!file) {
      setError('Please select a file first')
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      const text = await file.text()
      const json = JSON.parse(text)

      if (!validateJSON(json)) {
        setError('Invalid Tokens Studio JSON format. Expected token sets, themes, or tokens structure.')
        setIsProcessing(false)
        return
      }

      // Store raw JSON
      setRawTokens(json)
      
      // Parse tokens
      parseTokens(json)

      // Navigate to overview
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse JSON file')
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <Card className="w-full max-w-2xl p-8">
        <div className="flex flex-col gap-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">Variable Storybook</h1>
            <p className="text-muted-foreground text-lg">
              Multi-Brand Token Viewer
            </p>
          </div>

          <div
            className="border-2 border-dashed border-border rounded-lg p-12 text-center cursor-pointer hover:border-primary transition-colors"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <input
              id="file-input"
              type="file"
              accept=".json,application/json"
              onChange={handleFileChange}
              className="hidden"
            />
            {file ? (
              <div className="flex flex-col items-center gap-4">
                <CheckCircle2 className="h-12 w-12 text-primary" />
                <div>
                  <div className="font-medium">{file.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {(file.size / 1024).toFixed(2)} KB
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <Upload className="h-12 w-12 text-muted-foreground" />
                <div>
                  <div className="font-medium mb-1">
                    Drop your Tokens Studio JSON file here
                  </div>
                  <div className="text-sm text-muted-foreground">
                    or click to browse
                  </div>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="flex items-center gap-2 p-4 bg-destructive/10 border border-destructive/20 rounded-md text-destructive">
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Button
              onClick={handleImport}
              disabled={!file || isProcessing}
              className="w-full"
            >
              {isProcessing ? 'Processing...' : 'Import Tokens'}
            </Button>
            {file && (
              <Button
                variant="outline"
                onClick={() => {
                  setFile(null)
                  setError(null)
                }}
                className="w-full"
              >
                Clear
              </Button>
            )}
          </div>

          <div className="border-t pt-6">
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-medium">Expected JSON format:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Tokens Studio format with $themes, $tokens, or sets</li>
                <li>Token values using $value and $type</li>
                <li>References using {`{colors.*}`} syntax</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

