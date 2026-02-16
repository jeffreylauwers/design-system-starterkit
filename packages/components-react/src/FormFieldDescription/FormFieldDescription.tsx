import React from 'react';
import { classNames } from '@dsn/core';
import './FormFieldDescription.css';

export interface FormFieldDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Description content
   */
  children?: React.ReactNode;
}

/**
 * Form Field Description component
 * Optional help text displayed below the label and above the form control
 *
 * @example
 * ```tsx
 * // Basic usage
 * <FormFieldDescription>
 *   Vul hier uw officiële voornaam in zoals deze op uw paspoort staat.
 * </FormFieldDescription>
 *
 * // With ID for aria-describedby
 * <FormFieldDescription id="email-description">
 *   We gebruiken uw e-mailadres alleen voor accountgerelateerde berichten.
 * </FormFieldDescription>
 * ```
 */
export const FormFieldDescription = React.forwardRef<
  HTMLParagraphElement,
  FormFieldDescriptionProps
>(({ className, children, ...props }, ref) => {
  const classes = classNames('dsn-form-field-description', className);

  return (
    <p ref={ref} className={classes} {...props}>
      {children}
    </p>
  );
});

FormFieldDescription.displayName = 'FormFieldDescription';
