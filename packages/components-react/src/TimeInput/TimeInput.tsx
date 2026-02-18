import React from 'react';
import { classNames, FormControlWidth } from '@dsn/core';
import { Icon } from '../Icon';
import '../TextInput/TextInput.css';
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
 * Time input with an interactive clock button at inline-end that opens the native time picker.
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
 * <TimeInput defaultValue="14:30" />
 *
 * // Invalid state
 * <TimeInput invalid aria-invalid="true" aria-describedby="error" />
 * ```
 */
export const TimeInput = React.forwardRef<HTMLInputElement, TimeInputProps>(
  ({ className, invalid, width, disabled, readOnly, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Merge external ref with internal ref
    const handleRef = React.useCallback(
      (node: HTMLInputElement | null) => {
        (inputRef as React.MutableRefObject<HTMLInputElement | null>).current =
          node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLInputElement | null>).current =
            node;
        }
      },
      [ref]
    );

    const handleButtonClick = () => {
      if (inputRef.current && 'showPicker' in inputRef.current) {
        inputRef.current.showPicker();
      }
    };

    const wrapperClasses = classNames(
      'dsn-time-input-wrapper',
      width && `dsn-time-input-wrapper--width-${width}`
    );
    const inputClasses = classNames(
      'dsn-text-input',
      'dsn-time-input',
      className
    );

    return (
      <div className={wrapperClasses}>
        <input
          ref={handleRef}
          type="time"
          className={inputClasses}
          aria-invalid={invalid || undefined}
          disabled={disabled}
          readOnly={readOnly}
          {...props}
        />
        {!disabled && !readOnly && (
          <button
            type="button"
            className="dsn-time-input__button"
            onClick={handleButtonClick}
            tabIndex={-1}
            aria-hidden="true"
          >
            <Icon name="clock" aria-hidden />
            <span className="dsn-visually-hidden">Tijdkiezer openen</span>
          </button>
        )}
      </div>
    );
  }
);

TimeInput.displayName = 'TimeInput';
