import * as React from "react"
import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "../../atoms"

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
  showError?: boolean
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error, errorInfo)
    this.props.onError?.(error, errorInfo)
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null })
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      if (this.props.showError) {
        return (
          <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-8">
            <AlertCircle className="h-12 w-12 text-[var(--color-status-error-text)]" />
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
              Something went wrong
            </h2>
            <p className="text-center text-[var(--color-text-secondary)]">
              {this.state.error?.message || "An unexpected error occurred"}
            </p>
            <Button onClick={this.handleReset} variant="secondary">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </div>
        )
      }

      return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-8">
          <AlertCircle className="h-12 w-12 text-[var(--color-status-error-text)]" />
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
            Something went wrong
          </h2>
          <p className="text-center text-[var(--color-text-secondary)]">Please try again later.</p>
          <Button onClick={this.handleReset} variant="secondary">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}

export type { ErrorBoundaryProps }
