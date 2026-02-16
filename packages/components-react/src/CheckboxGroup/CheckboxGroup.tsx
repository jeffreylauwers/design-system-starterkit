import React from 'react';
import { classNames } from '@dsn/core';
import './CheckboxGroup.css';

export interface CheckboxGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Checkbox options to display in the group
   */
  children: React.ReactNode;
}

/**
 * Checkbox Group component
 * Container for multiple CheckboxOption components
 *
 * Note: This is just a list container. For a complete form field with label,
 * wrap this in a FormFieldset component.
 *
 * @example
 * ```tsx
 * // Basic usage (list only)
 * <CheckboxGroup>
 *   <CheckboxOption label="Sport" value="sport" />
 *   <CheckboxOption label="Muziek" value="music" />
 *   <CheckboxOption label="Reizen" value="travel" />
 * </CheckboxGroup>
 *
 * // Complete form field (with FormFieldset and FormFieldLegend)
 * <FormFieldset>
 *   <FormFieldLegend>Interesses</FormFieldLegend>
 *   <CheckboxGroup>
 *     <CheckboxOption label="Sport" value="sport" />
 *     <CheckboxOption label="Muziek" value="music" />
 *     <CheckboxOption label="Reizen" value="travel" />
 *   </CheckboxGroup>
 * </FormFieldset>
 * ```
 */
export const CheckboxGroup = React.forwardRef<
  HTMLDivElement,
  CheckboxGroupProps
>(({ className, children, ...props }, ref) => {
  const classes = classNames('dsn-checkbox-group', className);

  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  );
});

CheckboxGroup.displayName = 'CheckboxGroup';
