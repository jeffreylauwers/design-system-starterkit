import React from 'react';
import { classNames } from '@dsn/core';
import './FormFieldLabel.css';

export interface FormFieldLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * Optional suffix text displayed after the label (e.g., "(niet verplicht)")
   */
  suffix?: string;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Label content
   */
  children?: React.ReactNode;
}

/**
 * Form Field Label component
 * Label for form controls with optional suffix for "(niet verplicht)" or "(verplicht)"
 *
 * @example
 * ```tsx
 * // Basic usage
 * <FormFieldLabel htmlFor="firstname">Voornaam</FormFieldLabel>
 *
 * // With suffix for optional fields
 * <FormFieldLabel htmlFor="middlename" suffix="(niet verplicht)">
 *   Tussenvoegsel
 * </FormFieldLabel>
 *
 * // With suffix for required fields (when most fields are optional)
 * <FormFieldLabel htmlFor="email" suffix="(verplicht)">
 *   E-mailadres
 * </FormFieldLabel>
 * ```
 */
export const FormFieldLabel = React.forwardRef<HTMLLabelElement, FormFieldLabelProps>(
  ({ suffix, className, children, ...props }, ref) => {
    const classes = classNames('dsn-form-field-label', className);

    return (
      <label ref={ref} className={classes} {...props}>
        {children}
        {suffix && <span className="dsn-form-field-label-suffix">{suffix}</span>}
      </label>
    );
  }
);

FormFieldLabel.displayName = 'FormFieldLabel';
