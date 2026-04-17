import React from 'react';
import { classNames } from '@dsn/core';
import { Grid } from '../Grid';
import { GridItem } from '../Grid';
import './PageFooter.css';

export type PageFooterColorScheme = 'default' | 'inverse';

export interface PageFooterProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  'children'
> {
  /** Kolom 1 (inline-start). Doorgaans het organisatielogo in een `<a>`. */
  slot1?: React.ReactNode;

  /** Kolom 2. Optioneel — wordt niet gerenderd als weggelaten. */
  slot2?: React.ReactNode;

  /** Kolom 3. Vrije inhoud: navigatielinks, tekst, adressen, etc. */
  slot3?: React.ReactNode;

  /** Kolom 4 (inline-end). Vrije inhoud: juridische links, social media, etc. */
  slot4?: React.ReactNode;

  /**
   * Kleurschema van de footer.
   * - `default`: accent-1 achtergrond (`bg-default`)
   * - `inverse`: accent-1-inverse achtergrond voor een donkere huisstijlvariant
   * @default 'default'
   */
  colorScheme?: PageFooterColorScheme;
}

/**
 * PageFooter component
 * Paginavoettekst met accent-1 achtergrond, dikke border-block-start en
 * een 4-koloms grid. Responsief: verticale stapeling op mobiel,
 * vier gelijke kolommen op grote viewports (≥ 64em).
 *
 * Het `<footer>` element als directe afstammeling van `<body>` heeft
 * impliciet `role="contentinfo"` — geen extra attribuut nodig.
 *
 * @example
 * ```tsx
 * <PageFooter
 *   slot1={
 *     <a href="/">
 *       <Logo aria-hidden={true} />
 *       <span className="dsn-visually-hidden">Starter Kit — terug naar homepage</span>
 *     </a>
 *   }
 *   slot3={
 *     <UnorderedList>
 *       <li><Link href="/nieuws">Nieuws</Link></li>
 *       <li><Link href="/over-ons">Over ons</Link></li>
 *     </UnorderedList>
 *   }
 *   slot4={
 *     <UnorderedList>
 *       <li><Link href="/privacy">Privacyverklaring</Link></li>
 *       <li><Link href="/accessibility">Toegankelijkheid</Link></li>
 *     </UnorderedList>
 *   }
 * />
 * ```
 */
export const PageFooter = React.forwardRef<HTMLElement, PageFooterProps>(
  (
    {
      className,
      slot1,
      slot2,
      slot3,
      slot4,
      colorScheme = 'default',
      ...props
    },
    ref
  ) => {
    const classes = classNames(
      'dsn-page-footer',
      colorScheme === 'inverse' && 'dsn-page-footer--inverse',
      className
    );

    return (
      <footer ref={ref} className={classes} {...props}>
        <div className="dsn-page-footer__inner">
          <Grid>
            {slot1 && (
              <GridItem colSpan={12} colSpanLg={3}>
                {slot1}
              </GridItem>
            )}
            {slot2 && (
              <GridItem colSpan={12} colSpanLg={3}>
                {slot2}
              </GridItem>
            )}
            {slot3 && (
              <GridItem colSpan={12} colSpanLg={3}>
                {slot3}
              </GridItem>
            )}
            {slot4 && (
              <GridItem colSpan={12} colSpanLg={3}>
                {slot4}
              </GridItem>
            )}
          </Grid>
        </div>
      </footer>
    );
  }
);

PageFooter.displayName = 'PageFooter';
