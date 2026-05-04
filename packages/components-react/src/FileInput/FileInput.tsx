import React from 'react';
import { classNames } from '@dsn/core';
import './FileInput.css';

export interface FileInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Whether the input is in an invalid state
   * @default false
   */
  invalid?: boolean;
}

/**
 * File Input component
 * Styled wrapper around native <input type="file"> with support for
 * disabled and invalid states and multiple file selection.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <FileInput />
 *
 * // With label
 * <FormFieldLabel htmlFor="attachment">Bijlage</FormFieldLabel>
 * <FileInput id="attachment" accept=".pdf,.docx" />
 *
 * // Multiple files
 * <FileInput multiple />
 *
 * // Invalid
 * <FileInput invalid aria-describedby="error" />
 * ```
 */
export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, invalid, ...props }, ref) => {
    const classes = classNames('dsn-file-input', className);

    return (
      <input
        ref={ref}
        type="file"
        className={classes}
        aria-invalid={invalid || undefined}
        {...props}
      />
    );
  }
);

FileInput.displayName = 'FileInput';
