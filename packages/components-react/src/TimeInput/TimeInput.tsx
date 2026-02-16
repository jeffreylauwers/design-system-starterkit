import React from 'react';
import { classNames, FormControlWidth } from '@dsn/core';
import { Icon } from '../Icon';
import './TimeInput.css';

export interface TimeInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
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
 * Time Input component
 * Time input with clock icon on the right that triggers native time picker
 *
 * @example
 * ```tsx
 * // Basic usage
 * <TimeInput />
 *
 * // With label
 * <FormFieldLabel htmlFor="time">Tijd</FormFieldLabel>
 * <TimeInput id="time" />
 *
 * // With default value
 * <TimeInput value="14:30" />
 *
 * // Invalid state
 * <TimeInput invalid aria-invalid="true" aria-describedby="error" />
 * ```
 */
export const TimeInput = React.forwardRef<HTMLInputElement, TimeInputProps>(
  ({ className, invalid, width, ...props }, ref) => {
    const wrapperClasses = classNames(
      'dsn-time-input-wrapper',
      width && `dsn-time-input-wrapper--width-${width}`
    );
    const inputClasses = classNames(
      'dsn-text-input',
      'dsn-time-input',
      width && `dsn-text-input--width-${width}`,
      className
    );
    const iconClasses = classNames('dsn-time-input__icon');

    return (
      <div className={wrapperClasses}>
        <input
          ref={ref}
          type="time"
          className={inputClasses}
          aria-invalid={invalid || undefined}
          {...props}
        />
        <Icon name="clock" className={iconClasses} aria-hidden />
      </div>
    );
  }
);

TimeInput.displayName = 'TimeInput';
