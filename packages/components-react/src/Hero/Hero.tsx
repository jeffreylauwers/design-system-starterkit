import React from 'react';
import { classNames } from '@dsn/core';
import './Hero.css';

export type HeroVariant = 'default' | 'inverse' | 'image' | 'image-blend';
export type HeroAlign = 'start' | 'center';

export interface HeroProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Achtergrondstijl van de Hero.
   * @default 'default'
   */
  variant?: HeroVariant;

  /**
   * URL van de achtergrondafbeelding — vereist bij `variant="image"` of `"image-blend"`.
   * Wordt toegepast als CSS custom property `--dsn-hero-bg-image`.
   */
  backgroundImage?: string;

  /**
   * Horizontale uitlijning van de inhoud en tekst.
   * @default 'start'
   */
  align?: HeroAlign;

  children?: React.ReactNode;
  className?: string;
}

/**
 * Hero component
 * Prominente introductiesectie direct onder de PageHeader. Beslaat de volledige
 * paginabreedte via het BreakoutSection-patroon.
 *
 * Vereiste: de parent heeft `overflow-x: clip` (dsn-page-body).
 *
 * @example
 * ```tsx
 * <Hero>
 *   <Stack space="lg">
 *     <Heading level={1}>Paginatitel</Heading>
 *     <Paragraph variant="lead">Introductietekst.</Paragraph>
 *     <ActionGroup>
 *       <ButtonLink href="/start" variant="strong" size="large">Aan de slag</ButtonLink>
 *     </ActionGroup>
 *   </Stack>
 * </Hero>
 * ```
 */
export const Hero = React.forwardRef<HTMLElement, HeroProps>(
  (
    {
      variant = 'default',
      backgroundImage,
      align = 'start',
      className,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const classes = classNames(
      'dsn-hero',
      variant === 'inverse' && 'dsn-hero--inverse',
      (variant === 'image' || variant === 'image-blend') && 'dsn-hero--image',
      variant === 'image-blend' && 'dsn-hero--image-blend',
      align === 'center' && 'dsn-hero--align-center',
      className
    );

    const inlineStyle: React.CSSProperties & {
      '--dsn-hero-bg-image'?: string;
    } = backgroundImage
      ? { '--dsn-hero-bg-image': `url('${backgroundImage}')`, ...style }
      : { ...style };

    return (
      <section ref={ref} className={classes} style={inlineStyle} {...props}>
        <div className="dsn-hero__inner">
          <div className="dsn-hero__content">{children}</div>
        </div>
      </section>
    );
  }
);

Hero.displayName = 'Hero';
