import React from 'react';
import { classNames } from '@dsn/core';
import './UnorderedList.css';

export interface UnorderedListProps extends React.HTMLAttributes<HTMLUListElement> {
  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * List content (li elements)
   */
  children?: React.ReactNode;
}

/**
 * Unordered list component with accent-colored bullet markers
 *
 * @example
 * ```tsx
 * <UnorderedList>
 *   <li>First item</li>
 *   <li>Second item</li>
 *   <li>Third item</li>
 * </UnorderedList>
 * ```
 */
export const UnorderedList = React.forwardRef<HTMLUListElement, UnorderedListProps>(
  ({ className, children, ...props }, ref) => {
    const classes = classNames('dsn-unordered-list', className);

    return (
      <ul ref={ref} className={classes} {...props}>
        {children}
      </ul>
    );
  }
);

UnorderedList.displayName = 'UnorderedList';
