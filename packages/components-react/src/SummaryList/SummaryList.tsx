import React from 'react';
import { classNames } from '@dsn/core';
import './SummaryList.css';

// =============================================================================
// SummaryList
// =============================================================================

export interface SummaryListProps extends React.HTMLAttributes<HTMLDListElement> {
  /**
   * Removes the row separator borders
   * @default false
   */
  noBorder?: boolean;

  /**
   * `SummaryListRow` elements
   */
  children?: React.ReactNode;
}

export const SummaryList = React.forwardRef<HTMLDListElement, SummaryListProps>(
  ({ className, noBorder = false, children, ...props }, ref) => {
    const classes = classNames(
      'dsn-summary-list',
      noBorder && 'dsn-summary-list--no-border',
      className
    );

    return (
      <dl ref={ref} className={classes} {...props}>
        {children}
      </dl>
    );
  }
);

SummaryList.displayName = 'SummaryList';

// =============================================================================
// SummaryListRow
// =============================================================================

export interface SummaryListRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Marks a row without an actions cell; ensures consistent column alignment
   * in mixed lists where some rows have actions and others do not.
   * @default false
   */
  noActions?: boolean;

  /**
   * `SummaryListKey`, `SummaryListValue`, and optionally `SummaryListActions`
   */
  children?: React.ReactNode;
}

export const SummaryListRow = React.forwardRef<
  HTMLDivElement,
  SummaryListRowProps
>(({ className, noActions = false, children, ...props }, ref) => {
  const classes = classNames(
    'dsn-summary-list__row',
    noActions && 'dsn-summary-list__row--no-actions',
    className
  );

  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  );
});

SummaryListRow.displayName = 'SummaryListRow';

// =============================================================================
// SummaryListKey
// =============================================================================

export interface SummaryListKeyProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Label text or content
   */
  children?: React.ReactNode;
}

export const SummaryListKey = React.forwardRef<
  HTMLElement,
  SummaryListKeyProps
>(({ className, children, ...props }, ref) => {
  const classes = classNames('dsn-summary-list__key', className);

  return (
    <dt ref={ref} className={classes} {...props}>
      {children}
    </dt>
  );
});

SummaryListKey.displayName = 'SummaryListKey';

// =============================================================================
// SummaryListValue
// =============================================================================

export interface SummaryListValueProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Value content; may contain text, a `Link`, or other inline elements
   */
  children?: React.ReactNode;
}

export const SummaryListValue = React.forwardRef<
  HTMLElement,
  SummaryListValueProps
>(({ className, children, ...props }, ref) => {
  const classes = classNames('dsn-summary-list__value', className);

  return (
    <dd ref={ref} className={classes} {...props}>
      {children}
    </dd>
  );
});

SummaryListValue.displayName = 'SummaryListValue';

// =============================================================================
// SummaryListActions
// =============================================================================

export interface SummaryListActionsProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * One or more `Link` or `LinkButton` components
   */
  children?: React.ReactNode;
}

export const SummaryListActions = React.forwardRef<
  HTMLElement,
  SummaryListActionsProps
>(({ className, children, ...props }, ref) => {
  const classes = classNames('dsn-summary-list__actions', className);

  const isMultiple = React.Children.count(children) > 1;

  return (
    <dd ref={ref} className={classes} {...props}>
      {isMultiple ? (
        <ul className="dsn-summary-list__actions-list">
          {React.Children.map(children, (child) => (
            <li className="dsn-summary-list__actions-list-item">{child}</li>
          ))}
        </ul>
      ) : (
        children
      )}
    </dd>
  );
});

SummaryListActions.displayName = 'SummaryListActions';
