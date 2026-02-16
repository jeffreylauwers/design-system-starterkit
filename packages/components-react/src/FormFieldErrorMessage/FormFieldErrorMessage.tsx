import React from 'react';
import { classNames } from '@dsn/core';
import { Icon } from '../Icon';
import './FormFieldErrorMessage.css';

export interface FormFieldErrorMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * Whether to show the exclamation-circle icon before the message
   * @default true
   */
  showIcon?: boolean;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Error message content
   */
  children?: React.ReactNode;
}

/**
 * Form Field Error Message component
 * Error message displayed below the description and above the form control
 * Shows exclamation-circle icon by default for visual emphasis
 *
 * @example
 * ```tsx
 * // Basic usage with icon (default)
 * <FormFieldErrorMessage>Dit veld is verplicht.</FormFieldErrorMessage>
 *
 * // Without icon
 * <FormFieldErrorMessage showIcon={false}>
 *   Ongeldige waarde opgegeven.
 * </FormFieldErrorMessage>
 *
 * // With ID for aria-describedby
 * <FormFieldErrorMessage id="email-error">
 *   Vul een geldig e-mailadres in.
 * </FormFieldErrorMessage>
 * ```
 */
export const FormFieldErrorMessage = React.forwardRef<HTMLParagraphElement, FormFieldErrorMessageProps>(
  ({ showIcon = true, className, children, ...props }, ref) => {
    const classes = classNames('dsn-form-field-error-message', className);

    return (
      <p ref={ref} className={classes} {...props}>
        {showIcon && <Icon name="exclamation-circle" aria-hidden />}
        {children}
      </p>
    );
  }
);

FormFieldErrorMessage.displayName = 'FormFieldErrorMessage';
