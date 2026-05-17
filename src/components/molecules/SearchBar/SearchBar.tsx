import * as React from "react"
import { Search, X } from "lucide-react"
import { Input } from "../../atoms/Input"
import type { InputProps } from "../../atoms/Input"

export interface SearchBarProps {
  value?: string
  onChange?: (value: string) => void
  onClear?: () => void
  placeholder?: string
  inputProps?: Omit<InputProps, "ref" | "value" | "onChange" | "type">
  className?: string
}

const SearchBar = React.forwardRef<HTMLDivElement, SearchBarProps>(
  ({ value, onChange, onClear, placeholder = "검색...", inputProps, className }, ref) => {
    const [internalValue, setInternalValue] = React.useState("")
    const inputValue = value !== undefined ? value : internalValue

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (value === undefined) {
        setInternalValue(e.target.value)
      }
      onChange?.(e.target.value)
    }

    const handleClear = () => {
      if (value === undefined) {
        setInternalValue("")
      }
      onClear?.()
      onChange?.("")
    }

    return (
      <div ref={ref} className={`relative flex items-center ${className ?? ""}`}>
        <div className="pointer-events-none absolute left-3">
          <Search className="h-4 w-4 text-[var(--color-text-tertiary)]" />
        </div>
        <Input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          className="pr-10 pl-10"
          inputSize="md"
          {...inputProps}
        />
        {inputValue && (
          <button
            type="button"
            aria-label="검색어 지우기"
            onClick={handleClear}
            className="absolute right-2 rounded-full p-1 hover:bg-[var(--color-surface-subtle)]"
          >
            <X className="h-4 w-4 text-[var(--color-text-tertiary)]" />
          </button>
        )}
      </div>
    )
  }
)
SearchBar.displayName = "SearchBar"

export { SearchBar }
