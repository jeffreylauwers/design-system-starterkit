import React from 'react';
import { classNames } from '@dsn/core';
import './FormFieldLegend.css';

export interface FormFieldLegendProps extends React.HTMLAttributes<HTMLLegendElement> {
  /**
   * Optional suffix text displayed after the legend (e.g., "(niet verplicht)")
   */
  suffix?: string;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Legend content
   */
  children?: React.ReactNode;
}

/**
 * Form Field Legend component
 * Legend for fieldsets with optional suffix for "(niet verplicht)" or "(verplicht)"
 * Uses the same CSS classes as FormFieldLabel for consistent styling
 *
 * @example
 * ```tsx
 * // Basic usage
 * <FormFieldLegend>Interesses</FormFieldLegend>
 *
 * // With suffix for optional fields
 * <FormFieldLegend suffix="(niet verplicht)">
 *   Hobby's
 * </FormFieldLegend>
 *
 * // With suffix for required fields
 * <FormFieldLegend suffix="(verplicht)">
 *   Geslacht
 * </FormFieldLegend>
 * ```
 */
export const FormFieldLegend = React.forwardRef<HTMLLegendElement, FormFieldLegendProps>(
  ({ suffix, className, children, ...props }, ref) => {
    const classes = classNames('dsn-form-field-label', className);

    return (
      <legend ref={ref} className={classes} {...props}>
        {children}
        {suffix && <span className="dsn-form-field-label-suffix">{suffix}</span>}
      </legend>
    );
  }
);

FormFieldLegend.displayName = 'FormFieldLegend';
