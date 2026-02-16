import React from 'react';
import { classNames } from '@dsn/core';
import { FormFieldLegend } from '../FormFieldLegend';
import { FormFieldDescription } from '../FormFieldDescription';
import { FormFieldErrorMessage } from '../FormFieldErrorMessage';
import { FormFieldStatus, FormFieldStatusVariant } from '../FormFieldStatus';
import './FormFieldset.css';

export interface FormFieldsetProps {
  /**
   * The legend text for the fieldset
   */
  legend: string;

  /**
   * Optional suffix for the legend (e.g., "(niet verplicht)" or "(verplicht)")
   */
  legendSuffix?: string;

  /**
   * Optional description text
   */
  description?: React.ReactNode;

  /**
   * Optional error message (shows when field is invalid)
   */
  error?: React.ReactNode;

  /**
   * Optional status message
   */
  status?: React.ReactNode;

  /**
   * Status variant (for status message styling)
   * @default 'default'
   */
  statusVariant?: FormFieldStatusVariant;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * The form control element (CheckboxGroup, RadioGroup, DateInputGroup, etc.)
   */
  children: React.ReactNode;
}

/**
 * Form Fieldset component
 * Container that combines FormFieldLegend, FormFieldDescription, Control, FormFieldErrorMessage, and FormFieldStatus
 * Uses fieldset/legend structure for group controls (CheckboxGroup, RadioGroup, DateInputGroup)
 *
 * @example
 * ```tsx
 * // Checkbox group
 * <FormFieldset legend="Interesses" description="Selecteer minimaal één interesse">
 *   <CheckboxGroup>
 *     <CheckboxOption label="Sport" value="sport" />
 *     <CheckboxOption label="Muziek" value="music" />
 *     <CheckboxOption label="Reizen" value="travel" />
 *   </CheckboxGroup>
 * </FormFieldset>
 *
 * // Radio group with error
 * <FormFieldset
 *   legend="Geslacht"
 *   legendSuffix="(verplicht)"
 *   error="Selecteer een optie"
 * >
 *   <RadioGroup>
 *     <RadioOption name="gender" label="Man" value="male" />
 *     <RadioOption name="gender" label="Vrouw" value="female" />
 *     <RadioOption name="gender" label="Anders" value="other" />
 *   </RadioGroup>
 * </FormFieldset>
 *
 * // With status
 * <FormFieldset
 *   legend="Voorkeuren"
 *   status="Minimaal 2 opties vereist"
 *   statusVariant="warning"
 * >
 *   <CheckboxGroup>
 *     <CheckboxOption label="E-mail" value="email" />
 *     <CheckboxOption label="SMS" value="sms" />
 *     <CheckboxOption label="Push" value="push" />
 *   </CheckboxGroup>
 * </FormFieldset>
 * ```
 */
export const FormFieldset = React.forwardRef<HTMLFieldSetElement, FormFieldsetProps>(
  (
    {
      legend,
      legendSuffix,
      description,
      error,
      status,
      statusVariant = 'default',
      className,
      children,
    },
    ref
  ) => {
    const containerClasses = classNames('dsn-form-field', {
      'dsn-form-field--invalid': !!error,
    }, className);

    return (
      <fieldset ref={ref} className={containerClasses}>
        <FormFieldLegend suffix={legendSuffix}>
          {legend}
        </FormFieldLegend>

        {description && <FormFieldDescription>{description}</FormFieldDescription>}

        {error && <FormFieldErrorMessage>{error}</FormFieldErrorMessage>}

        {children}

        {status && (
          <FormFieldStatus variant={statusVariant}>
            {status}
          </FormFieldStatus>
        )}
      </fieldset>
    );
  }
);

FormFieldset.displayName = 'FormFieldset';
