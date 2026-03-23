import React from 'react';
import { classNames } from '@dsn/core';
import './Card.css';

// =============================================================================
// Context — Card deelt href met CardHeading via React context
// =============================================================================

interface CardContextValue {
  href?: string;
}

const CardContext = React.createContext<CardContextValue>({});

// =============================================================================
// Card — root container
// =============================================================================

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * URL voor de stretched link. De `CardHeading` ontvangt `href` automatisch
   * via React context en wraps de heading-tekst in een `<a>`.
   */
  href?: string;

  /** Sub-componenten: `CardHeader`, `CardBody`, `CardFooter` */
  children?: React.ReactNode;

  className?: string;
}

/**
 * Card component
 * Configureerbare container voor gestructureerde content met header, body en footer.
 * Gebruikt een stretched-link techniek: de link in `CardHeading` dekt de volledige card.
 * Screenreaders lezen alleen de heading-tekst als linknaam.
 *
 * @example
 * ```tsx
 * <Card href="/artikel/slug">
 *   <CardHeader>
 *     <Image src="/foto.jpg" alt="" width={800} height={450} ratio="16:9" />
 *   </CardHeader>
 *   <CardBody>
 *     <CardHeading level={2}>Artikeltitel</CardHeading>
 *     <Paragraph>Korte beschrijving.</Paragraph>
 *   </CardBody>
 *   <CardFooter>
 *     <Link href="/artikel/slug" aria-hidden tabIndex={-1}>Lees meer</Link>
 *   </CardFooter>
 * </Card>
 * ```
 */
export const Card = React.forwardRef<HTMLElement, CardProps>(
  ({ className, href, children, ...props }, ref) => {
    return (
      <CardContext.Provider value={{ href }}>
        <article
          ref={ref}
          className={classNames('dsn-card', className)}
          {...props}
        >
          {children}
        </article>
      </CardContext.Provider>
    );
  }
);

Card.displayName = 'Card';

// =============================================================================
// CardHeader — optionele afbeeldingssectie
// =============================================================================

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Afbeelding (`Image` component). Zonder children → toont placeholder
   * met `aspect-ratio: 16 / 9` voor visuele consistentie in groep.
   */
  children?: React.ReactNode;

  className?: string;
}

/**
 * CardHeader sub-component
 * Zonder children → toont automatisch een afbeeldingsplaceholder.
 */
export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames('dsn-card__header', className)}
        {...props}
      >
        {children ? (
          children
        ) : (
          <div className="dsn-card__image-placeholder" aria-hidden="true" />
        )}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

// =============================================================================
// CardBody — inhoudssectie
// =============================================================================

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  /** `CardHeading`, optionele extra content (bijv. `StatusBadge`), `Paragraph` */
  children?: React.ReactNode;

  className?: string;
}

/**
 * CardBody sub-component
 * Groeit via `flex: 1` zodat de footer altijd onderaan uitlijnt.
 */
export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames('dsn-card__body', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';

// =============================================================================
// CardHeading — heading met stretched link
// =============================================================================

export interface CardHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Semantisch heading-niveau. Visuele appearance is altijd "card-heading".
   * @default 2
   */
  level?: 2 | 3 | 4;

  /** Heading-tekst */
  children?: React.ReactNode;

  className?: string;
}

/**
 * CardHeading sub-component
 * Ontvangt `href` automatisch via React context van de parent `Card`.
 * Wanneer `href` beschikbaar is, wraps de heading-tekst in een `<a class="dsn-card-heading__link">`.
 * Het `::before` pseudo-element dekt de volledige card (stretched link).
 */
export const CardHeading = React.forwardRef<
  HTMLHeadingElement,
  CardHeadingProps
>(({ className, level = 2, children, ...props }, ref) => {
  const { href } = React.useContext(CardContext);
  const Tag = `h${level}` as 'h2' | 'h3' | 'h4';

  return (
    <Tag
      ref={ref}
      className={classNames('dsn-card-heading', className)}
      {...props}
    >
      {href ? (
        <a href={href} className="dsn-card-heading__link">
          {children}
        </a>
      ) : (
        children
      )}
    </Tag>
  );
});

CardHeading.displayName = 'CardHeading';

// =============================================================================
// CardFooter — voettekst
// =============================================================================

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** `Link` of `ButtonLink` — staat boven de stretched link via CSS z-index */
  children?: React.ReactNode;

  className?: string;
}

/**
 * CardFooter sub-component
 * Directe kinderen staan boven de stretched link via `z-index: 2` in CSS.
 * Gebruik `aria-hidden` + `tabIndex={-1}` op de link wanneer deze dezelfde
 * bestemming heeft als de card — vermijdt een dubbele tabstop.
 */
export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames('dsn-card__footer', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

// =============================================================================
// CardGroup — layout wrapper
// =============================================================================

export interface CardGroupProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Semantisch container-element.
   * Gebruik `div` wanneer cards geen lijst-context hebben.
   * @default 'ul'
   */
  as?: 'ul' | 'div';

  /** `Card` componenten */
  children?: React.ReactNode;

  className?: string;
}

/**
 * CardGroup sub-component
 * Flexbox wrapper die gelijke hoogte garandeert en de footer in elke card onderaan uitlijnt.
 * Rendert `role="list"` wanneer `as="ul"` — nodig omdat CSS-resets de lijstsemantiek verwijderen.
 */
export const CardGroup = React.forwardRef<HTMLElement, CardGroupProps>(
  ({ className, as: Tag = 'ul', children, ...props }, ref) => {
    const roleProps = Tag === 'ul' ? { role: 'list' as const } : {};

    return (
      <Tag
        ref={ref as React.Ref<HTMLUListElement & HTMLDivElement>}
        className={classNames('dsn-card-group', className)}
        {...roleProps}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

CardGroup.displayName = 'CardGroup';
