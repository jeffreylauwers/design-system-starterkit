import React from 'react';
import { classNames } from '@dsn/core';
import { Icon } from '../Icon';
import './Checkbox.css';

export interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  /**
   * Whether the checkbox is in an invalid state
   */
  invalid?: boolean;
  /**
   * Whether the checkbox is in an indeterminate state
   */
  indeterminate?: boolean;
}

/**
 * Checkbox component for boolean selection (without label)
 * Use CheckboxOption component to combine with a label
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ invalid, indeterminate, className, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    // Combine refs
    React.useImperativeHandle(ref, () => inputRef.current!);

    // Set indeterminate property (not available as HTML attribute)
    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate || false;
      }
    }, [indeterminate]);

    const inputClasses = classNames(
      'dsn-checkbox__input',
      invalid && 'dsn-checkbox__input--invalid',
      className
    );

    return (
      <div className="dsn-checkbox">
        <input
          ref={inputRef}
          type="checkbox"
          className={inputClasses}
          aria-invalid={invalid ? 'true' : undefined}
          {...props}
        />
        <span className="dsn-checkbox__control" aria-hidden="true">
          {indeterminate ? (
            <Icon name="minus" className="dsn-checkbox__icon" />
          ) : (
            <Icon name="check" className="dsn-checkbox__icon" />
          )}
        </span>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
