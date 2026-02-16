import React from 'react';
import { classNames } from '@dsn/core';
import './OptionLabel.css';

export interface OptionLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Whether the label is for a disabled input
   */
  disabled?: boolean;
}

/**
 * Label component for checkbox and radio button options
 */
export const OptionLabel = React.forwardRef<HTMLSpanElement, OptionLabelProps>(
  ({ disabled, className, children, ...props }, ref) => {
    const classes = classNames(
      'dsn-option-label',
      disabled && 'dsn-option-label--disabled',
      className
    );

    return (
      <span ref={ref} className={classes} {...props}>
        {children}
      </span>
    );
  }
);

OptionLabel.displayName = 'OptionLabel';
