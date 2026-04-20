import React from 'react';
import { classNames } from '@dsn/core';
import './BreakoutSection.css';

export type BreakoutSectionAs = 'div' | 'section' | 'article' | 'aside';

export interface BreakoutSectionProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * HTML-element — ontkoppelt semantiek van visuele stijl
   * @default 'section'
   */
  as?: BreakoutSectionAs;

  children?: React.ReactNode;
}

/**
 * BreakoutSection layout component
 * Laat een sectie "uitslaan" buiten een beperkte paginabreedte om de volledige
 * viewportbreedte te beslaan via `margin-inline: calc(50% - 50vw)`.
 *
 * Vereiste: de parent (.dsn-page-body) heeft `overflow-x: clip` zodat er geen
 * horizontale scrolbalk verschijnt.
 *
 * @example
 * ```tsx
 * <BreakoutSection style={{ backgroundColor: 'var(--dsn-color-accent-1-inverse-bg-default)' }}>
 *   <div style={{ maxInlineSize: 'var(--dsn-page-max-inline-size)', marginInline: 'auto', paddingInline: 'var(--dsn-page-body-padding-inline)' }}>
 *     <Heading level={2}>Uitgeslagen sectie</Heading>
 *   </div>
 * </BreakoutSection>
 * ```
 */
export const BreakoutSection = React.forwardRef<
  HTMLElement,
  BreakoutSectionProps
>(({ as: As = 'section', className, children, ...props }, ref) => {
  const classes = classNames('dsn-breakout-section', className);

  return (
    <As ref={ref as React.Ref<HTMLDivElement>} className={classes} {...props}>
      {children}
    </As>
  );
});

BreakoutSection.displayName = 'BreakoutSection';
