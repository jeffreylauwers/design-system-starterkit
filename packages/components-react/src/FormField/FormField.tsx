import React from 'react';
import { classNames } from '@dsn/core';
import { FormFieldLabel } from '../FormFieldLabel';
import { FormFieldDescription } from '../FormFieldDescription';
import { FormFieldErrorMessage } from '../FormFieldErrorMessage';
import { FormFieldStatus, FormFieldStatusVariant } from '../FormFieldStatus';
import './FormField.css';

export interface FormFieldProps {
  /**
   * The label text for the form field
   */
  label: string;

  /**
   * The ID of the form control (used for htmlFor/aria-describedby)
   */
  htmlFor?: string;

  /**
   * Optional suffix for the label (e.g., "(niet verplicht)" or "(verplicht)")
   */
  labelSuffix?: string;

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
   * The form control element (input, textarea, CheckboxGroup, RadioGroup, etc.)
   */
  children: React.ReactNode;
}

/**
 * Form Field component
 * Container that combines FormFieldLabel, FormFieldDescription, Control, FormFieldErrorMessage, and FormFieldStatus
 * Uses div/label structure (for fieldset/legend use FormFieldset component)
 *
 * @example
 * ```tsx
 * // Text input field
 * <FormField label="E-mailadres" htmlFor="email" description="We sturen hier geen spam naartoe">
 *   <TextInput id="email" type="email" />
 * </FormField>
 *
 * // With error
 * <FormField
 *   label="Wachtwoord"
 *   htmlFor="password"
 *   error="Wachtwoord moet minimaal 8 tekens bevatten"
 * >
 *   <PasswordInput id="password" invalid />
 * </FormField>
 *
 * // With status (character counter)
 * <FormField
 *   label="Bio"
 *   htmlFor="bio"
 *   status="280 van 500 karakters gebruikt"
 * >
 *   <TextArea id="bio" rows={4} />
 * </FormField>
 *
 * // With positive status
 * <FormField
 *   label="Wachtwoord"
 *   htmlFor="password"
 *   status="Wachtwoord is sterk genoeg"
 *   statusVariant="positive"
 * >
 *   <PasswordInput id="password" />
 * </FormField>
 * ```
 */
export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      label,
      htmlFor,
      labelSuffix,
      description,
      error,
      status,
      statusVariant = 'default',
      className,
      children,
    },
    ref
  ) => {
    const descriptionId = htmlFor && description ? `${htmlFor}-description` : undefined;
    const errorId = htmlFor && error ? `${htmlFor}-error` : undefined;
    const statusId = htmlFor && status ? `${htmlFor}-status` : undefined;

    const containerClasses = classNames('dsn-form-field', {
      'dsn-form-field--invalid': !!error,
    }, className);

    return (
      <div ref={ref} className={containerClasses}>
        <FormFieldLabel htmlFor={htmlFor} suffix={labelSuffix}>
          {label}
        </FormFieldLabel>

        {description && <FormFieldDescription id={descriptionId}>{description}</FormFieldDescription>}

        {error && <FormFieldErrorMessage id={errorId}>{error}</FormFieldErrorMessage>}

        {children}

        {status && (
          <FormFieldStatus id={statusId} variant={statusVariant}>
            {status}
          </FormFieldStatus>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';
