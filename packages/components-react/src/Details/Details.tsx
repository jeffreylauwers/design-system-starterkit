import React from 'react';
import { classNames } from '@dsn/core';
import { Icon } from '../Icon';
import './Details.css';

export interface DetailsProps extends Omit<
  React.HTMLAttributes<HTMLDetailsElement>,
  'onToggle'
> {
  /**
   * Zichtbare labeltekst in de `<summary>`
   */
  summary: string;

  /**
   * Standaard open bij eerste render (ongecontroleerde staat)
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Callback die wordt aangeroepen wanneer de open/dicht staat wijzigt
   */
  onToggle?: (open: boolean) => void;

  /**
   * De verborgen inhoud
   */
  children?: React.ReactNode;
}

/**
 * Details component
 * Uitvouwbare inhoudsaanwijzer voor aanvullende inhoud die niet iedereen nodig heeft.
 * Gebaseerd op het native `<details>`/`<summary>` element — CSS-only, geen JavaScript voor de toggle.
 *
 * @example
 * ```tsx
 * // Standaard gesloten
 * <Details summary="Meer informatie">
 *   <Paragraph>Aanvullende informatie die beschikbaar is voor wie dit nodig heeft.</Paragraph>
 * </Details>
 *
 * // Standaard open
 * <Details summary="Meer informatie" defaultOpen>
 *   <Paragraph>Inhoud is standaard zichtbaar.</Paragraph>
 * </Details>
 *
 * // Met toggle callback
 * <Details summary="Meer informatie" onToggle={(open) => console.log('open:', open)}>
 *   <Paragraph>Inhoud.</Paragraph>
 * </Details>
 * ```
 */
export const Details = React.forwardRef<HTMLDetailsElement, DetailsProps>(
  (
    { className, summary, defaultOpen = false, onToggle, children, ...props },
    ref
  ) => {
    const classes = classNames('dsn-details', className);

    const handleToggle = (event: React.SyntheticEvent<HTMLDetailsElement>) => {
      onToggle?.((event.currentTarget as HTMLDetailsElement).open);
    };

    return (
      <details
        ref={ref}
        className={classes}
        open={defaultOpen || undefined}
        onToggle={handleToggle}
        {...props}
      >
        <summary className="dsn-details__summary">
          <Icon name="chevron-down" className="dsn-details__icon" aria-hidden />
          <span className="dsn-details__summary-label">{summary}</span>
        </summary>
        <div className="dsn-details__content">{children}</div>
      </details>
    );
  }
);

Details.displayName = 'Details';
