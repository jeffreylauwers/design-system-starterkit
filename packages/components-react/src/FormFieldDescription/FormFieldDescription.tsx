import React from 'react';
import { classNames } from '@dsn/core';
import './FormFieldDescription.css';

export interface FormFieldDescriptionProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * HTML element to render — use 'div' when the description contains block-level
   * content such as a list (a <ul> cannot be nested inside a <p>)
   * @default 'p'
   */
  as?: 'p' | 'div';

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
 * Optional help text displayed below the label and above the form control.
 * Use `as="div"` when the description contains block-level content like a list.
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
 *
 * // With a list (requires as="div" to avoid invalid HTML)
 * <FormFieldDescription as="div" id="upload-description">
 *   Toegestane bestandstypen:
 *   <UnorderedList>
 *     <li>PDF (max. 5 MB)</li>
 *     <li>Word-documenten (.docx)</li>
 *   </UnorderedList>
 * </FormFieldDescription>
 * ```
 */
export const FormFieldDescription = React.forwardRef<
  HTMLElement,
  FormFieldDescriptionProps
>(({ as: As = 'p', className, children, ...props }, ref) => {
  const classes = classNames('dsn-form-field-description', className);

  return (
    <As
      ref={ref as React.Ref<HTMLParagraphElement>}
      className={classes}
      {...props}
    >
      {children}
    </As>
  );
});

FormFieldDescription.displayName = 'FormFieldDescription';
