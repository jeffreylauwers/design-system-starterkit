import React from 'react';
import { classNames, FormControlWidth } from '@dsn/core';
import '../TextInput/TextInput.css';

export type DecimalSeparator = 'comma' | 'period';

export interface NumberInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  /**
   * Decimal separator character
   * @default 'comma'
   */
  decimalSeparator?: DecimalSeparator;

  /**
   * Whether the input is in an invalid state
   * @default false
   */
  invalid?: boolean;

  /**
   * Width variant for the input
   * @default undefined (uses default max-width from form-control)
   */
  width?: FormControlWidth;

  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * Number Input component
 * Uses type="text" with inputmode="numeric" for better mobile UX (no spinner buttons)
 * Supports both comma and period as decimal separator
 *
 * @example
 * ```tsx
 * // Basic usage (comma separator, Dutch format)
 * <NumberInput placeholder="Bedrag" />
 *
 * // With period separator (international format)
 * <NumberInput decimalSeparator="period" placeholder="Amount" />
 *
 * // With label
 * <FormFieldLabel htmlFor="age">Leeftijd</FormFieldLabel>
 * <NumberInput id="age" />
 *
 * // Invalid state
 * <NumberInput invalid aria-invalid="true" aria-describedby="error" />
 * ```
 */
export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    { decimalSeparator = 'comma', className, invalid, width, ...props },
    ref
  ) => {
    const classes = classNames(
      'dsn-text-input',
      width && `dsn-text-input--width-${width}`,
      className
    );

    // Pattern allows: digits, comma, period, minus sign
    const pattern = '[0-9,.-]*';

    return (
      <input
        ref={ref}
        type="text"
        inputMode="numeric"
        pattern={pattern}
        className={classes}
        aria-invalid={invalid || undefined}
        autoComplete="off"
        {...props}
      />
    );
  }
);

NumberInput.displayName = 'NumberInput';
