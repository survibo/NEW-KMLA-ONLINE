import * as React from "react"
import { Input, InputWrapper, InputLabel, InputError } from "../../atoms/Input"
import type {
  InputProps,
  InputWrapperProps,
  InputLabelProps,
  InputErrorProps,
} from "../../atoms/Input"

export interface FormFieldProps extends InputWrapperProps {
  label?: string
  error?: string
  required?: boolean
  inputProps?: Omit<InputProps, "ref">
  labelProps?: InputLabelProps
  errorProps?: InputErrorProps
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    { className, label, error, required, inputProps, labelProps, errorProps, children, ...props },
    ref
  ) => {
    return (
      <InputWrapper ref={ref} className={className} {...props}>
        {label && (
          <InputLabel {...labelProps}>
            {label}
            {required && <span className="ml-0.5 text-[var(--color-status-error-text)]">*</span>}
          </InputLabel>
        )}
        {children ?? <Input {...inputProps} variant={error ? "error" : inputProps?.variant} />}
        {error && <InputError {...errorProps}>{error}</InputError>}
      </InputWrapper>
    )
  }
)
FormField.displayName = "FormField"

export { FormField }
