import React from 'react';
import { classNames } from '@dsn/core';
import './RadioGroup.css';

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Radio options to display in the group
   */
  children: React.ReactNode;
}

/**
 * Radio Group component
 * Container for multiple RadioOption components
 *
 * Note: This is just a list container. For a complete form field with label,
 * wrap this in a FormFieldset component.
 *
 * @example
 * ```tsx
 * // Basic usage (list only)
 * <RadioGroup>
 *   <RadioOption name="gender" label="Man" value="male" />
 *   <RadioOption name="gender" label="Vrouw" value="female" />
 *   <RadioOption name="gender" label="Anders" value="other" />
 * </RadioGroup>
 *
 * // Complete form field (with FormFieldset and FormFieldLegend)
 * <FormFieldset>
 *   <FormFieldLegend>Geslacht</FormFieldLegend>
 *   <RadioGroup>
 *     <RadioOption name="gender" label="Man" value="male" />
 *     <RadioOption name="gender" label="Vrouw" value="female" />
 *     <RadioOption name="gender" label="Anders" value="other" />
 *   </RadioGroup>
 * </FormFieldset>
 * ```
 */
export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, children, ...props }, ref) => {
    const classes = classNames('dsn-radio-group', className);

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';
