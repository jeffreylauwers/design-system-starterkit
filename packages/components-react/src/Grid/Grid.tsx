import React from 'react';
import { classNames } from '@dsn/core';
import './Grid.css';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Voegt een maximale breedte toe (--dsn-grid-max-width) en centreert de grid horizontaal.
   * Gebruik dit voor pagina-brede layouts met een vaste breedte.
   * @default false
   */
  contained?: boolean;

  /**
   * Child-elementen van de grid.
   */
  children?: React.ReactNode;
}

/**
 * Grid layout component
 * 12-koloms CSS Grid container met gutter en optionele max-width.
 * Gebruik GridItem voor kolomspanning van directe children.
 *
 * @example
 * ```tsx
 * // Standaard grid (volledige breedte)
 * <Grid>
 *   <GridItem colSpan={8}>Hoofdinhoud</GridItem>
 *   <GridItem colSpan={4}>Sidebar</GridItem>
 * </Grid>
 *
 * // Contained grid met max-width
 * <Grid contained>
 *   <GridItem colSpan={12}>Full-width sectie</GridItem>
 * </Grid>
 * ```
 */
export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, contained, children, ...props }, ref) => {
    const classes = classNames(
      'dsn-grid',
      contained && 'dsn-grid--contained',
      className
    );

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';
