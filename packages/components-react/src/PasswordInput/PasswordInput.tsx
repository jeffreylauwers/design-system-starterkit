import React from 'react';
import { classNames, FormControlWidth } from '@dsn/core';
import './PasswordInput.css';

export type PasswordAutocomplete = 'current-password' | 'new-password' | 'off';

export interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /**
   * Autocomplete value for password managers
   * @default 'current-password'
   */
  passwordAutocomplete?: PasswordAutocomplete;

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
 * Password Input component
 * Password input with extra padding for password manager icons
 *
 * @example
 * ```tsx
 * // Login form (current password)
 * <PasswordInput placeholder="Wachtwoord" />
 *
 * // Registration form (new password)
 * <PasswordInput passwordAutocomplete="new-password" placeholder="Nieuw wachtwoord" />
 *
 * // With label
 * <FormFieldLabel htmlFor="password">Wachtwoord</FormFieldLabel>
 * <PasswordInput id="password" />
 *
 * // Invalid state
 * <PasswordInput invalid aria-invalid="true" aria-describedby="error" />
 * ```
 */
export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ passwordAutocomplete = 'current-password', className, invalid, width, autoComplete, ...props }, ref) => {
    const classes = classNames(
      'dsn-text-input',
      'dsn-password-input',
      width && `dsn-text-input--width-${width}`,
      className
    );

    return (
      <input
        ref={ref}
        type="password"
        className={classes}
        autoComplete={autoComplete || passwordAutocomplete}
        aria-invalid={invalid || undefined}
        {...props}
      />
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
