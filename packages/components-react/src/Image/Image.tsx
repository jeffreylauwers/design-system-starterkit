import React from 'react';
import { classNames } from '@dsn/core';
import './Image.css';

// fetchpriority is not yet in React 18's HTMLAttributes types (added in React 19).
// Extend ImgHTMLAttributes locally so we can pass it through to the DOM.
type ImgProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fetchpriority?: 'high' | 'low' | 'auto';
};

export interface ImageProps extends React.HTMLAttributes<HTMLElement> {
  /** Verplicht. URL van de afbeelding */
  src: string;

  /** Verplicht. Alternatieve tekst. Lege string (`""`) voor decoratieve afbeeldingen — activeert automatisch `aria-hidden="true"` op de figure */
  alt: string;

  /** Verplicht. Intrinsieke breedte in pixels (voorkomt CLS) */
  width: number;

  /** Verplicht. Intrinsieke hoogte in pixels (voorkomt CLS) */
  height: number;

  /** Forceert beeldverhouding via CSS `aspect-ratio` + `object-fit: cover` */
  ratio?: '16:9' | '4:3' | '1:1';

  /** Hoe de afbeelding het ratio-kader vult. @default 'cover' */
  objectFit?: 'cover' | 'contain';

  /**
   * LCP-modus: `loading="eager"` + `fetchpriority="high"`.
   * Gebruik maximaal één keer per pagina voor de primaire LCP-afbeelding.
   * @default false
   */
  priority?: boolean;

  /** Optioneel bijschrift, rendert als `<figcaption>` */
  caption?: React.ReactNode;

  /** Pass-through naar native `srcset` attribuut */
  srcSet?: string;

  /** Pass-through naar native `sizes` attribuut */
  sizes?: string;
}

const ratioClassMap: Record<NonNullable<ImageProps['ratio']>, string> = {
  '16:9': 'dsn-image--ratio-16-9',
  '4:3': 'dsn-image--ratio-4-3',
  '1:1': 'dsn-image--ratio-1-1',
};

/**
 * Image component
 * Performante, toegankelijke wrapper rond het native `<img>` element.
 * Biedt ingebakken lazy loading, expliciete ondersteuning voor LCP/hero-afbeeldingen
 * via een `priority` prop, en vaste beeldverhoudingen via de CSS `aspect-ratio` property.
 *
 * @example
 * ```tsx
 * // Basis
 * <Image src="/foto.jpg" alt="Beschrijving" width={800} height={600} />
 *
 * // Met vaste beeldverhouding
 * <Image src="/hero.jpg" alt="Hero" width={1600} height={900} ratio="16:9" />
 *
 * // LCP / hero-afbeelding — max. één keer per pagina
 * <Image src="/hero.jpg" alt="Pagina hero" width={1600} height={900} ratio="16:9" priority />
 *
 * // Met bijschrift
 * <Image src="/foto.jpg" alt="Beschrijving" width={800} height={600} caption="Bijschrift" />
 *
 * // Decoratief — alt="" activeert automatisch aria-hidden="true" op de figure
 * <Image src="/decoratief.jpg" alt="" width={800} height={600} />
 * ```
 */
export const Image = React.forwardRef<HTMLElement, ImageProps>(
  (
    {
      className,
      src,
      alt,
      width,
      height,
      ratio,
      objectFit = 'cover',
      priority = false,
      caption,
      srcSet,
      sizes,
      ...props
    },
    ref
  ) => {
    const isDecorative = alt === '';

    const figureClasses = classNames(
      'dsn-image',
      ratio && ratioClassMap[ratio],
      objectFit === 'contain' && 'dsn-image--object-fit-contain',
      className
    );

    const imgProps: ImgProps = {
      className: 'dsn-image__img',
      src,
      alt,
      width,
      height,
      decoding: 'async',
      ...(priority
        ? { loading: 'eager', fetchpriority: 'high' }
        : { loading: 'lazy' }),
      ...(srcSet && { srcSet }),
      ...(sizes && { sizes }),
    };

    return (
      <figure
        ref={ref}
        className={figureClasses}
        {...(isDecorative && { 'aria-hidden': true })}
        {...props}
      >
        <img {...imgProps} />
        {caption && (
          <figcaption className="dsn-image__caption">{caption}</figcaption>
        )}
      </figure>
    );
  }
);

Image.displayName = 'Image';
