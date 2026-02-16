import React from 'react';
import { classNames } from '@dsn/core';
import { Radio, RadioProps } from '../Radio';
import { OptionLabel } from '../OptionLabel';
import './RadioOption.css';

export interface RadioOptionProps extends RadioProps {
  /**
   * Label text for the radio button
   */
  label: string;
}

/**
 * Radio button with label - combines Radio and OptionLabel
 */
export const RadioOption = React.forwardRef<HTMLInputElement, RadioOptionProps>(
  ({ label, disabled, className, ...radioProps }, ref) => {
    const wrapperClasses = classNames('dsn-radio-option', className);

    return (
      <label className={wrapperClasses}>
        <Radio ref={ref} disabled={disabled} {...radioProps} />
        <OptionLabel disabled={disabled}>{label}</OptionLabel>
      </label>
    );
  }
);

RadioOption.displayName = 'RadioOption';
