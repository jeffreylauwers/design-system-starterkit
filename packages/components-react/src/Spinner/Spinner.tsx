import React from 'react';
import { classNames } from '@dsn/core';
import './Spinner.css';

export type SpinnerSize = 'default' | 'large';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Tekstlabel dat de laadtoestand beschrijft voor alle gebruikers.
   * Altijd vereist — ook bij hideLabel wordt het label doorgegeven aan screenreaders.
   */
  label: string;

  /**
   * Verbergt het label visueel maar behoudt het voor screenreaders via dsn-visually-hidden
   * @default false
   */
  hideLabel?: boolean;

  /**
   * Grootte van de spinner.
   * default: 24×24px, label rechts.
   * large: 48×48px, label gecentreerd onder de spinner.
   * @default 'default'
   */
  size?: SpinnerSize;
}

/**
 * Spinner component
 * Cirkelvormige laadindicator voor onbepaalde wachttijden.
 *
 * role="status" op de container kondigt de laadtoestand aan bij screenreaders.
 * Het label is altijd aanwezig — visueel verbergen via hideLabel behoudt toegankelijkheid.
 *
 * @example
 * ```tsx
 * // Standaard met zichtbaar label
 * <Spinner label="Laden..." />
 *
 * // Grote variant met label onder de spinner
 * <Spinner size="large" label="Pagina wordt geladen" />
 *
 * // Enkel visueel verborgen label (toegankelijk voor screenreaders)
 * <Spinner label="Laden..." hideLabel />
 * ```
 */
export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  (
    { className, label, hideLabel = false, size = 'default', ...props },
    ref
  ) => {
    const classes = classNames(
      'dsn-spinner',
      size === 'large' && 'dsn-spinner--large',
      className
    );

    const labelClasses = classNames(
      'dsn-spinner__label',
      hideLabel && 'dsn-visually-hidden'
    );

    return (
      <div ref={ref} className={classes} role="status" {...props}>
        <svg
          className="dsn-spinner__circle"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle className="dsn-spinner__track" cx="12" cy="12" r="10" />
          <circle className="dsn-spinner__arc" cx="12" cy="12" r="10" />
        </svg>
        <span className={labelClasses}>{label}</span>
      </div>
    );
  }
);

Spinner.displayName = 'Spinner';
