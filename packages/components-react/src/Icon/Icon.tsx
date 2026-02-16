import React from 'react';
import { classNames } from '@dsn/core';
import { iconMap } from './icon-registry.generated';
import type { IconName } from './icon-registry.generated';

import './Icon.css';

export type { IconName };
export { iconMap };
export type IconSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

export interface IconProps extends Omit<React.SVGAttributes<SVGSVGElement>, 'name'> {
  /**
   * Icon name from Tabler Icons
   */
  name: IconName;
  
  /**
   * Icon size variant
   * @default 'md'
   */
  size?: IconSize;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Accessible label for the icon
   * If not provided, icon is marked as decorative (aria-hidden="true")
   */
  'aria-label'?: string;
}

/**
 * Icon component using individual Tabler Icon SVG imports
 * Only icons you use will be included in your bundle (tree-shaking)
 * 
 * @example
 * ```tsx
 * // Decorative icon (no label needed)
 * <Icon name="check" size="md" />
 * 
 * // Standalone icon (needs label)
 * <Icon name="settings" size="lg" aria-label="Open settings" />
 * 
 * // Icon with text (mark as decorative)
 * <span>
 *   <Icon name="check" size="sm" />
 *   Task complete
 * </span>
 * ```
 */
export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ name, size = 'md', className, 'aria-label': ariaLabel, ...props }, ref) => {
    const IconComponent = iconMap[name];

    if (!IconComponent) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(
          `[DSN Icon] Icon "${name}" not found. Available icons: ${Object.keys(iconMap).join(', ')}`
        );
      }
      return null;
    }

    const classes = classNames(
      'dsn-icon',
      size !== 'md' && `dsn-icon--${size}`,
      className
    );

    // If no aria-label is provided, mark as decorative
    const ariaProps = ariaLabel
      ? { 'aria-label': ariaLabel, role: 'img' }
      : { 'aria-hidden': true };

    return (
      <IconComponent
        ref={ref}
        className={classes}
        {...ariaProps}
        {...props}
      />
    );
  }
);

Icon.displayName = 'Icon';
