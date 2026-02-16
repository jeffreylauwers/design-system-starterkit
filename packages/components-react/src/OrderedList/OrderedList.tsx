import React from 'react';
import { classNames } from '@dsn/core';
import './OrderedList.css';

export interface OrderedListProps extends React.OlHTMLAttributes<HTMLOListElement> {
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
 * Ordered list component with numbered markers
 *
 * @example
 * ```tsx
 * <OrderedList>
 *   <li>First step</li>
 *   <li>Second step</li>
 *   <li>Third step</li>
 * </OrderedList>
 *
 * // Starting from a specific number
 * <OrderedList start={5}>
 *   <li>Fifth step</li>
 *   <li>Sixth step</li>
 * </OrderedList>
 * ```
 */
export const OrderedList = React.forwardRef<HTMLOListElement, OrderedListProps>(
  ({ className, children, ...props }, ref) => {
    const classes = classNames('dsn-ordered-list', className);

    return (
      <ol ref={ref} className={classes} {...props}>
        {children}
      </ol>
    );
  }
);

OrderedList.displayName = 'OrderedList';
