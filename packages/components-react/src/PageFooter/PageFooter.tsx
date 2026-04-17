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
  /**
   * Logo-inhoud voor slot 1 (inline-start).
   * Wikkel het logo in een `<a>` met `dsn-visually-hidden` tekst voor toegankelijkheid.
   */
  logoSlot: React.ReactNode;

  /**
   * Optioneel tussenslot voor slot 2 — leeg tussenruimte of toekomstige inhoud.
   * Als leeg, wordt het verborgen via CSS `:empty { display: none }`.
   */
  secondarySlot?: React.ReactNode;

  /**
   * Optionele korte paragraaf of contextinhoud voor slot 3.
   * Doorgaans een `<Paragraph>` met een `<Link>`.
   */
  contentSlot?: React.ReactNode;

  /**
   * Optionele lijst van footerlinks voor slot 4 (inline-end).
   * Doorgaans een `<UnorderedList>` met `<Link>`-items.
   */
  linksSlot?: React.ReactNode;

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
 *   logoSlot={
 *     <a href="/">
 *       <Logo aria-hidden={true} />
 *       <span className="dsn-visually-hidden">Starter Kit — terug naar homepage</span>
 *     </a>
 *   }
 *   contentSlot={
 *     <Paragraph>
 *       Lorem ipsum, <Link href="/about">meer informatie</Link>.
 *     </Paragraph>
 *   }
 *   linksSlot={
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
      logoSlot,
      secondarySlot,
      contentSlot,
      linksSlot,
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
            <GridItem colSpan={12} colSpanLg={3}>
              {logoSlot}
            </GridItem>
            <GridItem
              colSpan={12}
              colSpanLg={3}
              className="dsn-page-footer__empty-slot"
            >
              {secondarySlot}
            </GridItem>
            <GridItem colSpan={12} colSpanLg={3}>
              {contentSlot}
            </GridItem>
            <GridItem colSpan={12} colSpanLg={3}>
              {linksSlot}
            </GridItem>
          </Grid>
        </div>
      </footer>
    );
  }
);

PageFooter.displayName = 'PageFooter';
