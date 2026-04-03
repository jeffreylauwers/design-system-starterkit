import React from 'react';
import { classNames } from '@dsn/core';
import { Icon } from '../Icon';
import './MenuLink.css';

export type MenuLinkLevel = 1 | 2 | 3 | 4;

export interface MenuLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Navigatie-URL van de link
   */
  href?: string;

  /**
   * Hiërarchisch niveau — bepaalt de `padding-inline-start` inspringing
   * @default 1
   */
  level?: MenuLinkLevel;

  /**
   * Markeert de actieve/huidige pagina.
   * Voegt `aria-current="page"` toe aan het `<a>`-element.
   * @default false
   */
  current?: boolean;

  /**
   * Icoon links van het label
   */
  iconStart?: React.ReactNode;

  /**
   * Icoon rechts van het label — gebruik hier bij voorkeur geen NumberBadge (zie `numberBadge`)
   */
  iconEnd?: React.ReactNode;

  /**
   * NumberBadge element rechts van het label (naast iconEnd)
   * Verwacht een `<NumberBadge>` component.
   */
  numberBadge?: React.ReactNode;

  /**
   * Toont een uitklapknop naast de link (voor subnavigatie).
   * @default false
   */
  subItems?: boolean;

  /**
   * Geeft aan of de subnavigatie momenteel uitgevouwen is.
   * Alleen relevant wanneer `subItems` true is.
   * @default false
   */
  expanded?: boolean;

  /**
   * Callback die aangeroepen wordt wanneer op de uitklapknop geklikt wordt.
   */
  onExpandToggle?: () => void;

  /**
   * Zichtbare linktekst — ook gebruikt voor de toegankelijke naam van de uitklapknop
   */
  children?: React.ReactNode;

  /**
   * Aanvullende CSS-klassen voor het `<li>`-element
   */
  className?: string;
}

/**
 * MenuLink component
 * Navigatielink met niveau-hiërarchie, actieve staat en uitklapbare subnavigatie.
 * Semantisch een `<a>`, visueel consistent met MenuButton.
 *
 * Gebruik in een `<ul>`-element (het `<nav>`-element met lijst).
 *
 * @example
 * ```tsx
 * // Basisgebruik (level 1)
 * <MenuLink href="/dashboard">Dashboard</MenuLink>
 *
 * // Actieve pagina
 * <MenuLink href="/rapporten" current>Rapporten</MenuLink>
 *
 * // Level 2 (subpagina)
 * <MenuLink href="/rapporten/maandelijks" level={2}>Maandelijks</MenuLink>
 *
 * // Met icoon en NumberBadge
 * <MenuLink
 *   href="/inbox"
 *   iconStart={<Icon name="mail" aria-hidden />}
 *   numberBadge={<NumberBadge variant="negative">5</NumberBadge>}
 * >
 *   Inbox
 * </MenuLink>
 *
 * // Met uitklapknop
 * <MenuLink
 *   href="/rapporten"
 *   subItems
 *   expanded={isExpanded}
 *   onExpandToggle={() => setIsExpanded(!isExpanded)}
 * >
 *   Rapporten
 * </MenuLink>
 * ```
 */
export const MenuLink = React.forwardRef<HTMLAnchorElement, MenuLinkProps>(
  (
    {
      href,
      level = 1,
      current = false,
      iconStart,
      iconEnd,
      numberBadge,
      subItems = false,
      expanded = false,
      onExpandToggle,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const liClasses = classNames(
      'dsn-menu-link',
      level > 1 && `dsn-menu-link--level-${level}`,
      className
    );

    const childrenText = typeof children === 'string' ? children : undefined;

    return (
      <li className={liClasses}>
        <a
          ref={ref}
          className="dsn-menu-link__link"
          href={href}
          aria-current={current ? 'page' : undefined}
          {...props}
        >
          {iconStart}
          <span className="dsn-menu-link__label">{children}</span>
          {numberBadge}
          {iconEnd}
        </a>

        {subItems && (
          <span className="dsn-menu-link__divider" aria-hidden="true" />
        )}
        {subItems && (
          <button
            type="button"
            className="dsn-button dsn-button--subtle dsn-button--size-small dsn-button--icon-only dsn-menu-link__expand-button"
            aria-expanded={expanded}
            onClick={onExpandToggle}
          >
            <Icon name="chevron-down" aria-hidden />
            <span className="dsn-button__label">
              {expanded ? 'Inklappen' : 'Uitklappen'}
              {childrenText && (
                <span className="dsn-visually-hidden">
                  {' '}
                  voor {childrenText}
                </span>
              )}
            </span>
          </button>
        )}
      </li>
    );
  }
);

MenuLink.displayName = 'MenuLink';
