import React from 'react';
import { classNames } from '@dsn/core';
import './Radio.css';

export interface RadioProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  /**
   * Whether the radio button is in an invalid state
   */
  invalid?: boolean;
}

/**
 * Radio button component for single selection (without label)
 * Use RadioOption component to combine with a label
 */
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ invalid, className, ...props }, ref) => {
    const inputClasses = classNames(
      'dsn-radio__input',
      invalid && 'dsn-radio__input--invalid',
      className
    );

    return (
      <div className="dsn-radio">
        <input
          ref={ref}
          type="radio"
          className={inputClasses}
          aria-invalid={invalid ? 'true' : undefined}
          {...props}
        />
        <span className="dsn-radio__control" aria-hidden="true">
          <span className="dsn-radio__inner-circle"></span>
        </span>
      </div>
    );
  }
);

Radio.displayName = 'Radio';
