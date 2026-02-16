import React from 'react';
import { classNames } from '@dsn/core';
import { Checkbox, CheckboxProps } from '../Checkbox';
import { OptionLabel } from '../OptionLabel';
import './CheckboxOption.css';

export interface CheckboxOptionProps extends CheckboxProps {
  /**
   * Label text for the checkbox
   */
  label: string;
}

/**
 * Checkbox with label - combines Checkbox and OptionLabel
 */
export const CheckboxOption = React.forwardRef<
  HTMLInputElement,
  CheckboxOptionProps
>(({ label, disabled, className, ...checkboxProps }, ref) => {
  const wrapperClasses = classNames('dsn-checkbox-option', className);

  return (
    <label className={wrapperClasses}>
      <Checkbox ref={ref} disabled={disabled} {...checkboxProps} />
      <OptionLabel disabled={disabled}>{label}</OptionLabel>
    </label>
  );
});

CheckboxOption.displayName = 'CheckboxOption';
