import React from 'react';
import { classNames, FormControlWidth } from '@dsn/core';
import './TextArea.css';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Whether the textarea is in an invalid state
   * @default false
   */
  invalid?: boolean;

  /**
   * Width variant for the textarea
   * @default undefined (uses default max-width from form-control)
   */
  width?: FormControlWidth;
}

/**
 * Text Area component
 * Multi-line text input with support for various states (hover, focus, disabled, invalid, read-only)
 *
 * @example
 * ```tsx
 * // Basic usage
 * <TextArea placeholder="Enter your bio" rows={4} />
 *
 * // With label
 * <FormFieldLabel htmlFor="bio">Biography</FormFieldLabel>
 * <TextArea id="bio" rows={6} />
 *
 * // Disabled
 * <TextArea disabled value="Cannot edit" rows={3} />
 *
 * // Invalid
 * <TextArea invalid aria-invalid="true" aria-describedby="error" rows={4} />
 *
 * // Read-only
 * <TextArea readOnly value="View only" rows={3} />
 * ```
 */
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, invalid, width, rows = 4, ...props }, ref) => {
    const classes = classNames(
      'dsn-text-area',
      width && `dsn-text-area--width-${width}`,
      className
    );

    return (
      <textarea
        ref={ref}
        className={classes}
        rows={rows}
        aria-invalid={invalid || undefined}
        {...props}
      />
    );
  }
);

TextArea.displayName = 'TextArea';
