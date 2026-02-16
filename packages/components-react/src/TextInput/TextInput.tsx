import React from 'react';
import { classNames, FormControlWidth } from '@dsn/core';
import './TextInput.css';

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Additional CSS class names
   */
  className?: string;

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
}

/**
 * Text Input component
 * Single-line text input with support for various states (hover, focus, disabled, invalid, read-only)
 *
 * @example
 * ```tsx
 * // Basic usage
 * <TextInput placeholder="Enter your name" />
 *
 * // With label
 * <FormFieldLabel htmlFor="email">Email</FormFieldLabel>
 * <TextInput id="email" type="email" />
 *
 * // Disabled
 * <TextInput disabled value="Read only value" />
 *
 * // Invalid
 * <TextInput invalid aria-invalid="true" aria-describedby="error" />
 *
 * // Read-only
 * <TextInput readOnly value="Cannot edit this" />
 * ```
 */
export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, invalid, width, type = 'text', ...props }, ref) => {
    const classes = classNames(
      'dsn-text-input',
      width && `dsn-text-input--width-${width}`,
      className
    );

    return (
      <input
        ref={ref}
        type={type}
        className={classes}
        aria-invalid={invalid || undefined}
        {...props}
      />
    );
  }
);

TextInput.displayName = 'TextInput';
